import Dropdown from './controllers/dropdown_controller'
import { Application } from '@hotwired/stimulus'

const application = Application.start()
application.register('dropdown', Dropdown)
