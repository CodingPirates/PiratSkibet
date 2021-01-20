# Pirates :skull:

## Initial Setup

1. First install the required packages using composer.

    ``` bash
    $ composer install
    ```
 
2. Setup a MySQL database.  

3. Copy the `.env.example` file to `.env` and fill out the following required information:
    * APP_URL
    * DB Credentials

4. Run the following commands:
    ``` bash
    $ php artisan system:setup
    ```


### Env

A couple of notes on some of the parameters in the `.env` file:

##### QUEUE_CONNECTION

The project has been designed with the `database` queue driver in mind
(with the possibility of upgrading to a `redis` driver later; you can read more here [Laravel Queues][laravel-queues]).  
For a development environment the default `sync` driver should be able to be used.
This will however affect the performance of the application.
On a live server the queue system must be setup correctly: [Queues](#queues)

##### SSL/HTTPS

For security reasons the project must always use an SSL connection.
To ensure the application always uses a secure connection, we use the following package: [Laravel Https][laravel-https]
However this might not be desirable for a development environment.
To turn this off set the following parameters to false:

* USE_SSL
* REDIRECT_TO_HTTPS


## Development

For a more indepth look, and for anything not covered in this document, please refer to:

* The official Laravel documentation [Laravel Documentation][laravel-docs]
* The official React documentation [React Documentation][react-docs]
* The customized boilerplate documentation [Boilerplate Documentation][boilerdocs]


### System Commands

A couple of artisan commands are included to make development and deployment easier.

* `system:setup` is only used for the initial project setup.

* `system:build` resets the entire DB and seeds it with data.

* `system:refresh` is used to reset any cached configurations, and update the persmissions.  
    This is especially important when developing new Resource endpoints,
    or changing permissions for existing ones.
    It can also be setup on a live server to run during deployment.


### Directory structure

Here is an overview of some of the non-standard Laravel directory structure used in this project.

* `App\Models`: These are just Laravel Models, but are grouped in a `Models` dir,
    and then further grouped contextually in sub-directories.

* `App\Resources`: These are the Resource classes from our boilerplate.
    These represent traditional Laravel Controllers.
    This is where all Api endpoints & page endpoints are defined.
    The different sub directories define the Namespace of a Resource,
    which is used to generate and reference routes.

* `App\Operations`: An Operation class is equivalent to a route & Controller method.
    While most standard Api routes use the CRUD Operations from [Laravel Resources][laravel-resources],
    these project specific Operations usually represent a Model specific action.

* `App\Support\Enums`: These are our Enum classes from [Laravel Support][laravel-support].
    They simulate Enums in Php, for stricter values and reusability.
    We also use these in the React frontend, so the strict values only have to be defined one place.
    See more here: [Context](#context)


### React

To work with React you first need to install all the required packages.

``` bash
$ npm install
```

To build files during development use:

``` bash
$ npm run watch
```

Finally before pushing to production, build the optimized files with:

``` bash
$ npm run prod
```

For more info on the custom React boilerplate go here: [Boilerplate Documentation][boilerdocs]


### <a name="queues"></a>Queues

To offload a lot of time consuming tasks from user requests, a lot of the system works through Laravel Queues.  
The following command is used to run all the project defined queues, in the right order (priority).

``` bash
$ php artisan queue:work database --sleep=3 --tries=3 --queue=default,forum,emails,notifications,events,sorting,system
```

On a server set this up using supervisor following this: [Laravel Queues Supervisor][laravel-queues-supervisor]


### Sockets & Pusher

To achieve real-time communications with the client,
we use websocket connections and the [Pusher][pusher] service.
We do this with Laravel's built-in functionality: [Laravel Broadcasting][laravel-broadcasting].

Here are the primary uses of sockets:

* Notifications:  
    These are mostly just regular user notification using the default [Laravel Notifications][laravel-notifications].
    There is some custom functionality, which is covered here: [Repeatable Notifications](#notifications)
    
* Live chat in the forum:  
    This forum actually works more like a chat, with live updating content in the frontend

* User specific events:  
    There are a couple of user specific events, which use broadcasting.
    Specifically the granting of gamification achievements/rewards,
    as well as a new user being upgraded to a fully fledged pirate.

* Some live updates of content:  
    Other than the chat, some other content is triggered to update through broadcasting.  
    Content in the moderation section of the admin panel, will update live,
    after changes are made by another online user, or after a time consuming queued job executes.  
    The "shutdown" of the site which happens during night hours, also partially uses broadcasting.


### <a name="context"></a>Context

Context is primarily used to define what data should be provided to the frontend `env`.
It is used to export things like:

* All routes available to the current user, their parameters and uri's:  
    This is used for routing in the React application, creating links and more.

* All Api resources, their endpoints/methods, information about available filters, etc.  
    These are used for all our Ajax calls.

* Enums with their values and translated text content:  
    Mostly used for displaying strict types of data, and select fields with predefined options.

* User specific data:
    This could be the users system permissions, or some of their basic information.

* Config information required for the frontend:
    These could be keys for services like Googles ReCaptcha, or Bugsnag,
    or system wide settings like the shutdown times.
    
For more information on how to use Context look here: [Boilerplate Context][boilerdocs-context]


### Moderation

#### Features

The project has an extensive Content Moderation system,
paired with a User Suspensions and Blocking.  
The system allows Users to report, or `flag`, undesirable content, which creates a `ModerationCase`.
This in turn, notifies Moderators, who can inspect the case in the admin panel,
and choose to take Action against the flagged content, or even the User responsible for the content.

The possible `Actions` vary depending on the content (the `Moderateable` Model) in question.
This could be hiding the content of a Forum Message so it is not visible to the public.
All `Moderateable` Models have Actions for suspending or Blocking the User.

A User suspensions removes their ability to create or edit any content on the site,
until the suspension is lifted. A suspension is set for a specific time frame,
but can be lifted manually by a administrator.

When a User is Blocked, they are essentially soft deleted, with no ability to login into the system.
If chosen by the Moderator, all content created by the User can also be hidden.
A Blocked User also receives an email, which let's them appeal their case, if they feel unfairly treated.

To make it easier to handle large amounts of flagged content,
an Automatic Moderation system is also in place.
If enough User have flagged the content before a Moderator handles the case,
an automatic Action will take place.


#### Relevant Code

The system is relatively dynamic, and is mainly composed of relevant Traits, and Actions classes.  
The relevant code can be found here:

* `App\Support\Contracts\Moderateable`: an interface for all content which can be moderated.
* `App\Support\Traits\Moderation\HasModerationRequests`: functionality for flagging `Moderateable` Models.
* `App\Support\Traits\Moderation\HasModerationActions`: used to define Model specific Moderation `Actions`.
* `App\Support\Traits\Moderation\Blockable`: used to hide content, when a User gets Blocked.
* `App\Support\Services\Moderation\*`: all moderation Actions are defined in here.
* `App\Models\Moderation\*`: here are all the Moderation specific Models.


#### Flow

##### 1. Requesting Moderation

The first step of the process is when a User requests moderation of content.
Currently there are 4 `Moderateable` Models; Models which can be flagged.

* `App\Models\User\User`: Users can be flagged from their Profile page.
* `App\Models\Projects\Project`: Projects can be flagged from Project pages.
* `App\Models\Forum\Message`: A single Message can be flagged in the Forum.
* `App\Models\Forum\Thread`: An entire Thread can be flagged from the parent Message.

Before a User can flag something, a permission check is performed.
These are defined in the `Moderateable` Models [Policies][laravel-policies] as `flag`,
however the logic is defined in the `HasModerationRequests` Trait, in the `canUserFlag()` method.  
Here it is determined weather a User can flag the Moderateable entity.
A User cannot flag himself, or flag the same entity multiple times before it has been resolved.

If possible, a User can flag the content by choosing a reason from `App\Support\Enums\ModerationReasons`,
and writing a comment. The request logic is handled in `HasModerationRequests` `flag()` method.
Here a `ModerationRequest` is made for the request, and a `ModerationCase` will be created
(or updated if already exists) for the `Moderateable` Model.

Upon the creation of the `ModerationRequest`, a notification for admin users is dispatched (`NewModerationRequest`),
and the `AutomaticallyModerateCase` job is scheduled for the case. [Automatic Moderation](#auto_mod)


##### 2. Moderation Actions

After moderation has been requested on a `Moderateble` model, moderators can view the case in the admin panel.
Here they can gain an overview of the moderation requests made against the `Moderateable`,
the content of the Model, the history of Actions performed on the Case,
as well as information on the responsible User, including their other moderation Cases and active suspensions.
Finally they can choose to perform any Actions which are possible for the Model.
Look at `App\Support\Traits\Moderation\HasModerationActions` to see how Actions are bound to a specific Model.

Moderation Actions consist of 2 parts.

1. `App\Support\Services\Moderation\Actions`: these are classes which define the Action functionality. 
2. `App\Models\Moderation\ModerationAction`: this is a historical log of all Moderation Actions executed for any case.

There are 3 Action types:

* `RESOLUTION`: these actions "resolve" the case, meaning they will close the ModerationCase ([note](#auto_mod_resolve))
* `COMMENT`: these are only for communication purposes
* `SYSTEM`: these are automatic actions performed by the system. Mostly used for opening and closing the case,
            as well as sending out User notifications, which need to be recorded in the Action log.

Most Action classes only define the `perform()` method, but `afterExecute()` and `canPerform()` are also used.
For a more in depth look at how Actions work, refer to the abstract `App\Support\Services\Moderation\Abstracts\Action` class.


##### <a name="auto_mod"></a>3. Automatic Moderation

Upon the creation of a `ModerationRequest`, the system attempts to perform an Automatic Moderation.
This is done in the `App\Jobs\Moderation\AutomaticallyModerateCase` job.
The relevant code is defined in `App\Models\Moderation\ModerationCase` `needsAutomaticResolution()` method.
Here a calculation is made, based on the configuration in `permissions.moderation`.
Moderation Requests made by Users with different Roles, have a different `weight` value.
The sum of this `weight` value, is calculated from all the `ModerationRequests` made for the case.
If the sum is `>=` than the `threshold`, Automatic Moderation will be performed.

`getCustomAutomaticResolutionActions()` on the individual Model is used to define which Actions should be performed in this case.
The `SuspendUser` action always takes place, to ensure a malicious User can't wreak havoc on the site,
in the time it takes a moderator to inspect the case manually.  

<a name="auto_mod_resolve"></a>It is important to note, that when an automatic action of type `RESOLUTION` is executed,
it will not close the case. This is done with the assumption that each case needs a human to finalize it.


##### Suspensions and Blocking

When a User has an active suspension (see: `App\Models\User\User::getIsSuspendedAttribute()`)
the vast majority of the sites functionality is locked for them.
This is simply done by including a check for this in Model [Policies][laravel-policies].

When a User is Blocked, their User Model is Soft Deleted.
When this happens, a `BlockedUserNotice` mail is sent to them, and their parents.
The mail contains a [signed route][laravel-signed-routes], which leads to an appeal page.
Here the User can submit a form with their appeal,
the content of which will be visible on the Moderation Case in the admin panel.
The Case will also be reopened in this case, so it will appear as not final.

If the Moderators should wish to unblock the User, this can be done under `Users -> Pirates`
in the admin panel, by sorting for blocked users only, and going to the user in question.
Here an `Unblock` action is available.


#### Live update with sockets

In order to bring the most current data on Moderation Cases to the moderators,
the moderation section in the admin panel, uses a websocket connection,
to force update content in the client, when it changes on the server.
This is done by the broadcasting event `App\Events\Moderation\ModerationCase\Updated`,
which is simply triggered whenever any Case related models update.


### <a name="notifications"></a>Notifications

##### Repeatable Notifications

To achieve Notification which can change content or context (f.ex. the count of likes on a Project),
we use a custom Notification [Channel][laravel-notifications-channels].

The `App\Channels\RepeatableDatabaseChannel` Channel class,
extends the default Laravel database Channel.
However instead of always creating a new Notification,
it has the ability to find, and update an already existing Notification.
Paired with the `App\Support\Traits\Notifications\Repeatable` trait used on individual Notification classes,
we can change the content of an individual Notification.

This is an example of how this might work for the `App\Notifications\Forum\MessageReaction` Notification:

1. Someone likes a users Forum Message

2. We create and send a new Notification with the content: "User X has liked your message"

3. Another user likes the same Forum Message

4. This time instead of creating a new Notification,
    we use the specified Identifiers (Notification class, Related Forum Message etc.),
    to find the already existing Notification,
    and update its content to: "User Y and 1 more, have liked your message"

This can continue with more likes,
where the content of the Notification might end up being "User Z and 25 others have liked your message".
This gives us the flexibility, to edit or even remove Notifications (f.ex. if somebody "unliked" a message),
without having to create duplicate Notifications for the same entity.

The keys to creating these Repeatable Notifications are:

* The `App\Support\Traits\Notifications\Repeatable` trait.  
    It tells the `RepeatableDatabaseChannel` that this Notification should attempt to be updated,
    instead of just created.

* The `getIdentifiers()` method, which defines something unique to the case, so we can find the Notification to updated.
    
* The `toArray()` method, which defines the content of the Notification independently

In most cases, the Identifiers will be specifically related to a model.
Let's look at an example for the `App\Notifications\Forum\MessageReaction` Notification.  
When the `RepetableDatabaseChannel` attempts to find a Notification to update,
it will query the Notifications like this:

* It will only look for Notifications for the User we are notifying (this is default `DatabaseChannel` behaviour).

* It looks for Notifications with the "type" of `App\Notifications\Forum\MessageReaction`

* It will look for the json "data" param, containing matching Identifiers.
    In this case it is the `message_id`.

A Message written by a user, only needs 1 Notification to show how many likes it has received.'
These 3 constrains are enough to find that Notification and update it.
Because the `read_at` attribute is always reset to null,
and we order the Notifications by the `updated_at` param,
whenever a user receives a new like on their Message,
the Notification will go to the top of their list,
and look like a new, unread Notification.
But we we don't have to worry about cleanup of older Notifications,
so we can easily avoid cases where the users Notification tray might fill up with repeated data,
and look something like this:

* User a, and 4 others have liked your message
* User b, and 3 others have liked your message
* User c, and 2 others have liked your message
* User d, and 2 others have liked your message
* User e, and 1 other has liked your message
* User f has liked your message

To make this work, there are a couple more things to consider,
when creating the `toArray()` method.
As mentioned earlier it needs to define its data independently of the Notification process.
We do not track how many times a Notification might have been sent.  
A simple way too look at it, is to always create data,
that is relevant at the time of execution.
F.ex. the `MessageReaction` Notification is only relevant,
if the Message in question has likes.
Users can remove their likes from Messages.
Therefore, we take a count of the Messages likes, and if it is 0,
we deactivate the Notification, which hides it from the user.

##### Links in Notifications

Most Notifications will act as links when pressed on,
to take the User to the relevant place on the site.
To do this simply define the `route` & `params` parameters in the Notification data.
In this example we link to a specific Message in a Forum Thread.

```php
[
    'route'      => 'app.forum.message',
    'parameters' => ['thread' => $this->thread->id, 'message' => $this->message->id],
];
```


[laravel-docs]:                     https://laravel.com/docs/6.x
[laravel-broadcasting]:             https://laravel.com/docs/6.x/broadcasting
[laravel-notifications]:            https://laravel.com/docs/6.x/notifications
[laravel-notifications-channels]:   https://laravel.com/docs/6.x/notifications#custom-channels
[laravel-queues]:                   https://laravel.com/docs/6.x/queues
[laravel-queues-supervisor]:        https://laravel.com/docs/6.x/queues#supervisor-configuration
[laravel-policies]:                 https://laravel.com/docs/6.x/authorization#creating-policies
[laravel-signed-routes]:            https://laravel.com/docs/6.x/urls#signed-urls

[laravel-resources]:    https://github.com/Morning-Train/LaravelResources
[laravel-support]:      https://github.com/Morning-Train/LaravelSupport
[laravel-https]:        https://github.com/Morning-Train/laravel-https

[boilerdocs]:           http://boilerdocs.backuptrain.dk
[boilerdocs-context]:   http://boilerdocs.backuptrain.dk/laravel/context.html

[react-docs]:   https://reactjs.org/
[pusher]:       https://pusher.com/channels
