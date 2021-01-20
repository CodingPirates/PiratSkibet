import { Modal } from '@morningtrain/react-modals'
import { router } from '@morningtrain/helpers'

Modal.defaultProps = {
  ...Modal.defaultProps,
  closeIcon: router.url('icons/close.svg')
}

export { Base, Label, Trigger } from '@morningtrain/react-modals'
export { Modal }
