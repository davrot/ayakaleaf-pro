import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { matchSorter } from 'match-sorter'
import { useSymbolPaletteConfig } from '../context/symbol-palette-context'
import { getSymbolCharacter } from '../utils/symbol-character'
import SymbolPaletteSearch from './symbol-palette-search'
import SymbolPaletteBody from './symbol-palette-body'
import SymbolPaletteTabs from './symbol-palette-tabs'
import SymbolPaletteDrawToggle from './symbol-palette-draw-toggle'

const SymbolPaletteDraw = lazy(() => import('./symbol-palette-draw'))

// Recognition rasterises strokes on an OffscreenCanvas in a worker, which
// Safari 15 (still a supported browser) lacks.
const drawingSupported =
  typeof OffscreenCanvas !== 'undefined' &&
  new OffscreenCanvas(1, 1).getContext('2d') !== null

export default function SymbolPaletteContent({ handleSelect }) {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [drawing, setDrawing] = useState(false)

  const { categories, symbols } = useSymbolPaletteConfig()

  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id)

  // Update active category if current one was removed
  useEffect(() => {
    if (categories.length > 0 && !categories.find(c => c.id === activeCategoryId)) {
      setActiveCategoryId(categories[0].id)
    }
  }, [categories, activeCategoryId])

  // group the symbols by category, converting codepoints to characters
  const categorisedSymbols = useMemo(() => {
    const output = {}
    for (const category of categories) {
      output[category.id] = []
    }
    for (const item of symbols) {
      if (item.category in output) {
        const withChar = {
          ...item,
          character: getSymbolCharacter(item),
        }
        output[item.category].push(withChar)
      }
    }
    return output
  }, [categories, symbols])

  // all symbols with characters for search
  const allSymbolsWithChars = useMemo(() => {
    return symbols.map(item => ({
      ...item,
      character: getSymbolCharacter(item),
    }))
  }, [symbols])

  // select symbols which match the input
  const filteredSymbols = useMemo(() => {
    if (input === '') {
      return null
    }

    const words = input.trim().split(/\s+/)

    return words.reduceRight(
      (syms, word) =>
        matchSorter(syms, word, {
          keys: ['command', 'description', 'character', 'aliases'],
          threshold: matchSorter.rankings.CONTAINS,
        }),
      allSymbolsWithChars
    )
  }, [input, allSymbolsWithChars])

  const inputRef = useRef(null)

  // allow the input to be focused
  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // focus the input when the symbol palette is opened
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="symbol-palette-container">
      <div className="symbol-palette">
        <div className="symbol-palette-header-outer">
          <div className="symbol-palette-header">
            <SymbolPaletteTabs
              categories={categories}
              activeCategoryId={activeCategoryId}
              setActiveCategoryId={setActiveCategoryId}
            />
            <div className="symbol-palette-header-group">
              <SymbolPaletteSearch
                setInput={setInput}
                inputRef={inputRef}
                onFocus={() => setDrawing(false)}
              />
              {drawingSupported && (
                <SymbolPaletteDrawToggle
                  active={drawing}
                  setActive={setDrawing}
                />
              )}
            </div>
          </div>
        </div>
        <div className="symbol-palette-body">
          {drawing && drawingSupported ? (
            <Suspense
              fallback={
                <div className="symbol-palette-draw-instructions">
                  {t('symbol_palette_loading_model')}
                </div>
              }
            >
              <SymbolPaletteDraw handleSelect={handleSelect} />
            </Suspense>
          ) : (
          <SymbolPaletteBody
            categories={categories}
            categorisedSymbols={categorisedSymbols}
            filteredSymbols={filteredSymbols}
            handleSelect={handleSelect}
            focusInput={focusInput}
            activeCategoryId={activeCategoryId}
          />
          )}
        </div>
      </div>
    </div>
  )
}
SymbolPaletteContent.propTypes = {
  handleSelect: PropTypes.func.isRequired,
}
