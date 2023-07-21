This is my view of config structure
-----------------------------------
By default, we have `local.properties` file. In this properties file we put settings relevant for all env`s except prod. Because the production server must be excluded from any test changes on any steps.

# How it works

## Hybris
### Optional configuration
In Hybris, we can set the property `hybris.optional.config.dir` to set the folder location where store environment settings.
And for setup on CI/CD pipeline, we also can use environment variable (The environment variable overrides the `hybris.optional.config.dir` property.)
```shell
export HYBRIS_OPT_CONFIG_DIR = 'home/hybris/config/environments/prod'
```
In the variable folder all properties files must have [2digit number] between 10 and 99 in the name `XX-local.properties` so the structure of settings looks like this:

- `local.properties`
  - `10-local.properties`
  - `99-local.properties`

All settings read from the `10-local.properties` file first and then the `20-local.properties`.

### runtime properties

For using runtime properties we can set:
```properties
runtime.config.file.path = /etc/hybris/runtime.properties
```
This setting gave us possible change any settings in runtime without restarting the server. And we can name this file how we want.

We also can change the reading strategy implemented own class:

``` properties
runtime.config.loader.class = org.foo.bar.YourImplementation
```

## Structure
### Development
By default, the project configured for the developer all settings must use developer properties and by maximum configured to **startup in few shell commands**.

For developer properties by default optional dir is set to hybris config dir, this gave us to use possible create settings for developers and see the basic structure.

In `10.local.properties` we put all hybris developer settings and for the project developer, we create `20-local.properties`.

For best practices, we use `99-local.properties` for local developer settings, for example, database credentials.

In the end, we use `developer.properties` with settings that the developer can change in runtime for debugging or other developer needs.

Here is our properties structure:
- `local.properties` (settings relevant for all servers, like enabled feature)
  - `10-local.properties` (hybris developer settings)
  - `20-local.properties` (project developer settings)
  - `99-local.properties` (local developer settings excluded from git, developers save hare database settings, etc)
    - `developer.properties` (runtime developer settings)

### Test and Prod servers

In most cases, we copy the developer structure, but we have some changes. First of all properties files are stored in `config/environment/*serverName*`, and we can create sub servers so many as we want:

- **environment**
  - **test**
    - `collective.properties` (runtime settings for all test servers, DevOps can change settings in runtime)
    - **FQA**
      - **FQA-1**
        - `10-local.properties` (hybris test server settings)       
        - `20-local.properties` (project test server settings)      
      - **FQA-2**
        - `10-local.properties` (hybris test server settings)
        - `20-local.properties` (project test server settings)
      - **FQA-3**
        - `10-local.properties` (hybris test server settings)
        - `20-local.properties` (project test server settings)
    - **UAT**
      - **UAT-en**
        - `10-local.properties` (hybris test server settings)
        - `20-local.properties` (project test server settings)
      - **UAT-de**
        - `10-local.properties` (hybris test server settings)
        - `20-local.properties` (project test server settings)
  - **prod**
    - `env-local.properties` (prod server settings, replace local properties)
    - `10-local.properties` (hybris prod server settings)
    - `20-local.properties` (project prod server settings)      
    - `runtime.properties` (runtime prod server settings)

In structure, we see a few changes:
- `collective.properties` - one for all test servers, but DevOps can change destination file storage to own, there we collect all settings which we can change in runtime and want to save this setting after restarting the server
- `10-local.properties` - hybris settings idea the same as in the developer structure
- `20-local.properties`- project settings idea the same as in developer structure
- `env-local.properties`- exclude `local.properties` from load and use this like the first load property file
- `runtime.properties` - runtime server settings for changes that we need to save after restarting the server before it pushed to git in the normal way

Folders and some specific changes, or other things can be changed by the project needed. This is my view to store settings without creating build files to create properties files with yaml, shell, etc.
We can easily add to all test servers some setting without copy past to each server the same property and at the same time, we can change the property on the one of servers without any problems.

If some servers need personality settings, like prod, we can add them in his folder `env-local.properties`, and this server not load the `local.properties` file anymore.

### Problems
In this structure I see only one problem - if we have some feature that we enabled in all servers not at one time we need to refactor all settings and enable it in one place.

To fix this problem we can make a practice to refactor property files on all test servers after this property goes to the production server.