import { FileMagnifyingGlass } from '@phosphor-icons/react'
import getMeta from '@/utils/meta'
import type { RailElement } from '@/features/ide-react/util/rail-types'
import type { RailTabKey } from '@/features/ide-react/context/rail-context'
import ProjectInspectionPanel from './components/project-inspection-panel'

const { enableProjectInspection } = getMeta('ol-ExposedSettings') as {
  enableProjectInspection?: boolean
}

const ProjectInspectionIcon: RailElement['icon'] = ({ open, title }) => (
  <FileMagnifyingGlass
    aria-label={title}
    className="ide-rail-tab-link-icon"
    size={24}
    weight={open ? 'fill' : 'regular'}
  />
)

const projectInspectionRailEntry: RailElement = {
  key: 'project-inspection' as RailTabKey,
  icon: ProjectInspectionIcon,
  title: 'Project inspection',
  component: <ProjectInspectionPanel />,
  hide: !enableProjectInspection,
}

export default projectInspectionRailEntry
