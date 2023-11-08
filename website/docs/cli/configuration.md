---
title: Portals CLI Configuration
sidebar_label: Configuration
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Portals Configuration file allows you to specify configuration details for syncing multiple Portals applications. This file is used to define the apps to be synchronized and various settings related to those apps. Before you begin you will need a Personal Access Token.

### Create a Personal Access Token

Now that we have the web application all setup in Appflow and built we need to get our local environment setup to be able to pull it from Appflow.

The first step in setting up our local environment is [generating a personal access token](https://dashboard.ionicframework.com/settings/personal-access-tokens).

This is done from `Personal Settings` in the `Personal Access Token` tab.

<em style={{
  textAlign: 'center',
  display: 'block'
}}>
<img src={useBaseUrl("/img/personal-access-token-thumbnail.webp")} data-zoom-src={useBaseUrl("/img/personal-access-token.webp")} width="75%"/>
</em>

Click the `Generate new token` button. While creating the token it is a best practice to give it an optional expiration date but not required.

:::tip
After the token is generated you will need to copy it to clipboard because it will be required for the next step. Usually the token follows the format of `ion_XXXXXXXXXXXXX`.
:::

# Portals CLI Configuration

Below is the schema and documentation for the configuration options:

```yaml
sync:
  - app-id: [PORTALS_APP_ID]
    channel: [CHANNEL]
    directory-name: [DIRECTORY_NAME]
  - app-id: [PORTALS_APP_ID]
    channel: [CHANNEL]
    directory-name: [DIRECTORY_NAME]
  # ... (add more apps if needed)

token: [PORTALS_AUTH_TOKEN]
```

### Configuration Options

1. **`sync` (List of Apps)**

   - This is a list of apps that you want to synchronize. Each app is specified as a dictionary with the following attributes.

   - **`app-id` (Required)**

     - Type: String
     - Description: The unique identifier for the Appflow application you want to sync.

   - **`channel` (Optional)**

     - Type: String
     - Default: `production`
     - Description: The channel of the Appflow application to be synchronized.

   - **`directory-name` (Optional)**
     - Type: String
     - Default: the `app-id` will be used
     - Description: The directory name where the synchronized app will be saved.

2. **`token` (Required)**
   - Type: String
   - Description: The authentication token required to access Portals and perform sync operations. This token should be kept secure, as it provides access to your Appflow deployments.

### Usage

1. **`sync` Section**

   - Add entries under the `sync` section to define the Portals applications you want to synchronize.
   - Specify the `app-id` for each application to identify it.
   - Optionally, provide a `channel` to specify a specific version or branch of the app to sync.
   - Optionally, define a `directory-name` to specify the directory where the synchronized app will be saved.

   Example:

   ```yaml
   sync:
     - app-id: 186b544f
     - app-id: a7b10ac1
       channel: development
       directory-name: home
     - app-id: a81b2440
       directory-name: cart
   ```

2. **`token` Section**

   - In the `token` section, provide your Appflow Personal Access Token.

   Example:

   ```yaml
   token: ion_Bq2aIK8JeREJKLC8FDhWO84pHrvmvde4ceayS
   ```
