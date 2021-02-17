
/// Import moment locales to make them available later
import 'moment/locale/da'

/// Load the React app module. It will take care of most bootstrapping
import app from '@morningtrain/react-app'

import PaginationLayout from 'layouts/BackendPagination'
import Pagination from '@morningtrain/react-filters/Pagination'

/// Optionally register additional plugins
/// A plugin is a class implementing a boot method
/// The boot method should accept an app instance as a parameter
/// In order to work with boot flow, the method should return a Promise
// app.register(SomePlugin);
console.log(app)
Pagination.setLayout(PaginationLayout)

/// Define the services to wrap all pages in
/// It should be a series of react components that all render their children
app.services([
  [require('@morningtrain/react-core/providers/Context'), { persist: true }],
  require('@morningtrain/react-resources/src/OperationRepository').default,
  require('@morningtrain/react-auth/Service').default,
  require('services/Toastify').default,
  require('@morningtrain/react-spawner').Spawner
])

/// Specify default page template
app.defaultTemplate('Backend')

/// Configure which React components to load into the application
/// Only components included in this object, can be added from Laravel Blade views.
/// It should primarily be the main app page components that are included here

app.setReactComponents('backend', {
  Home: require('pages/backend/Home').default,
  Login: require('pages/backend/Login').default,
  Users: {
    Pirates: {
      Index: require('pages/backend/users/pirates/Index').default,
      Edit: require('pages/backend/users/pirates/Edit').default
    },
    Backend: {
      Index: require('pages/backend/users/backend/Index').default,
      Edit: require('pages/backend/users/backend/Edit').default
    }
  },
  Contact: {
    Index: require('pages/backend/contact/Index').default,
    Edit: require('pages/backend/contact/Edit').default
  },
  Moderation: {
    Case: {
      Index: require('pages/backend/moderation/cases/Index').default,
      View: require('pages/backend/moderation/View').default
    },
    Suspension: {
      Index: require('pages/backend/moderation/suspensions/Index').default,
      Edit: require('pages/backend/moderation/suspensions/Edit').default
    }
  },
  Forum: {
    Topic: {
      Index: require('pages/backend/forum/topics/Index').default,
      Edit: require('pages/backend/forum/topics/Edit').default
    }
  },
  Content: {
    Events: {
      Index: require('pages/backend/content/events/Index').default,
      Edit: require('pages/backend/content/events/Edit').default
    },
    News: {
      Index: require('pages/backend/content/news/Index').default,
      Edit: require('pages/backend/content/news/Edit').default
    },
    AnimatedTickerTexts: {
      Index: require('pages/backend/content/animated_ticker_texts/Index').default,
      Edit: require('pages/backend/content/animated_ticker_texts/Edit').default
    },
    TwitchChannels: {
      Index: require('pages/backend/content/twitch_channels/Index').default,
      Edit: require('pages/backend/content/twitch_channels/Edit').default
    },
    Videos: {
      Index: require('pages/backend/content/videos/Index').default,
      Edit: require('pages/backend/content/videos/Edit').default
    },
    Meetings: {
      Index: require('pages/backend/content/meetings/Index').default,
      Edit: require('pages/backend/content/meetings/Edit').default
    },
    Posts: {
      Index: require('pages/backend/content/posts/Index').default,
      Edit: require('pages/backend/content/posts/Edit').default
    }
  },
  Projects: {
    Categories: {
      Index: require('pages/backend/projects/categories/Index').default,
      Edit: require('pages/backend/projects/categories/Edit').default
    }
  },
  Courses: {
    Category: {
      Index: require('pages/backend/courses/categories/Index').default,
      Edit: require('pages/backend/courses/categories/Edit').default
    },
    Course: {
      Index: require('pages/backend/courses/courses/Index').default,
      Edit: require('pages/backend/courses/courses/Edit').default
    }
  },
  Gamification: {
    AvatarItems: {
      Index: require('pages/backend/gamification/avatar_items/Index').default,
      Edit: require('pages/backend/gamification/avatar_items/Edit').default
    },
    Achievements: {
      Index: require('pages/backend/gamification/achievements/Index').default,
      Edit: require('pages/backend/gamification/achievements/Edit').default
    },
    UserTitles: {
      Index: require('pages/backend/gamification/user_titles/Index').default,
      Edit: require('pages/backend/gamification/user_titles/Edit').default
    },
    Users: {
      Index: require('pages/backend/gamification/users/Index').default,
      View: require('pages/backend/gamification/users/View').default
    }
  }
})

/// Boot the application
/// It will loop through all applied plugins and load them in order.
/// After booting all plugins, it will listen to a document ready event
/// When the DOM is ready, it will then mount and render all react components present in the DOM
app.run()
