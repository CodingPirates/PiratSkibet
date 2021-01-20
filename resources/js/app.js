
/// Import moment locales to make them available later
import 'moment/locale/da'

/// Load the React app module. It will take care of most bootstrapping
import app from '@morningtrain/react-app'

/// Optionally register additional plugins
/// A plugin is a class implementing a boot method
/// The boot method should accept an app instance as a parameter
/// In order to work with boot flow, the method should return a Promise
// app.register(SomePlugin);
import ServiceWorker from 'plugins/ServiceWorker'

import PaginationLayout from 'layouts/DefaultPagination'
import Pagination from '@morningtrain/react-filters/Pagination'

/// Configure which React components to load into the application
/// Only components included in this object, can be added from Laravel Blade views.
/// It should primarily be the main app page components that are included here

import Home from 'pages/app/Home'
import Overview from 'pages/app/courses/Overview'
import Courses from 'pages/app/courses/Courses'
import Course from 'pages/app/courses/Course'
import Step from 'pages/app/courses/Step'
import Pirate from 'pages/app/Pirate'
import Test from 'pages/app/Test'
import PasswordReset from 'pages/app/PasswordReset'

app.register(ServiceWorker)

console.log(app)
Pagination.setLayout(PaginationLayout)

/// Define global services to wrap all pages in
app.globalServices([
  require('widgets/jitsi/Jitsi').default
])

/// Define the services to wrap all pages in
/// It should be a series of react components that all render their children
app.services([
  [require('@morningtrain/react-core/providers/Context'), { persist: true }],
  require('@morningtrain/react-resources/src/OperationRepository').default,
  require('@morningtrain/react-auth/Service').default,
  require('services/Toastify').default,
  require('services/FlashFromSession').default,
  require('@morningtrain/react-spawner').Spawner,
  require('@morningtrain/react-modals').Repository
])

/// Specify default page template
app.defaultTemplate('Base')

app.setReactComponents('app', {
  Welcome: Home,
  Courses: {
    Overview: Overview,
    Courses: Courses,
    Course: Course,
    Step: Step
  },
  Forum: {
    Overview: require('pages/app/forum/Overview').default,
    Thread: require('pages/app/forum/Thread').default,
    Topic: require('pages/app/forum/Topic').default
  },
  Projects: {
    Overview: require('pages/app/projects/Overview').default,
    Project: require('pages/app/projects/Project').default,
    Edit: require('pages/app/projects/Edit').default
  },
  Tv: {
    Index: require('pages/app/tv/Index').default
  },
  Pirate: Pirate,
  Test: Test,
  PasswordReset: PasswordReset,
  Content: {
    Pages: {
      User_introduction: require('pages/app/content/pages/UserIntroduction').default,
      Parent_introduction: require('pages/app/content/pages/ParentIntroduction').default,
      Contact: require('pages/app/content/pages/Contact').default,
      About: require('pages/app/content/pages/About').default,
      Rules: require('pages/app/content/pages/Rules').default,
      Post: require('pages/app/content/pages/Post').default
    }
  },
  Appeal: require('pages/app/Appeal').default,
  Submissions: {
    AvatarItem: require('pages/app/submissions/AvatarItem').default
  }
})

/// Boot the application
/// It will loop through all applied plugins and load them in order.
/// After booting all plugins, it will listen to a document ready event
/// When the DOM is ready, it will then mount and render all react components present in the DOM
app.run()
