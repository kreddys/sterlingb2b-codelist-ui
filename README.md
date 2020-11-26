[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
    <img src="https://3ulsmb4eg8vz37c0vz2si64j-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/react-native-UX-design.gif" alt="logo" width="40%" />

  <h3 align="center">sterlingb2b-codelist-ui</h3>

  <p align="center">
    User Interface to easily Create, Read, Update, Delete & Clone Codelist entries in Sterling B2B Integrator
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Tool](#about-the-Tool)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [config.json](#Config)
* [Usage](#usage)
* [Future Enhancements](#future-enhancements)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)



## About The Tool

Sterling Integrator's Codelists provide an easy way to configure parameters for a business process, however, I find it very tedious to work with codelists.

Here's why:
* It takes time to search a specific codelist entry ( specially if the codelist has 100's of entries)
* It is not possible to customize column names.
* Difficult to clone an entry to create a new one ( We need to copy-paste each field)

Using this tool, You can:
* Create, Read, Update & Delete codelist entries in Sterling B2B Integrator.
* Add custom column names to SenderCode, ReceiverCode, Description, Text1, Text2... Text9.
* Easily filter a codelist to find a specific code.
* Clone an existing entry, Make updates and then save the new entry.

This user interface is also secured with a login page. To view the codelists, You need to login with the same credentials you login to Sterling dashboard.

**Codelist in Sterling B2B's dashboard**
[![Codelist in Sterling Integrator][sterling-b2b-codelist]](https://example.com)

**Codelist in react-admin User Interface, With Filter Option**
[![Codelist in sterlingb2b-codelist-ui][react-admin-list]](https://example.com)

* Some more screenshots are added to examples folder.


### Built With

This tool is built on react-admin (frontend framework for any rest backend) by using B2B REST API's CodelistCode Servcies as backend.

* [react-admin](https://github.com/marmelab/react-admin)
* [B2B REST APIs](https://www.ibm.com/support/knowledgecenter/SS3JSW_6.0.0/developing/developing/filegateway/B2B_APIs_avail.html)


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* [NodeJS](https://nodejs.org/en/download/)
* [B2B REST API's](https://www.ibm.com/support/knowledgecenter/en/SS4TGX_2.2.0/com.ibm.help.sfg_reference.doc/B2B_REST_APIs.html)
* [GIT](https://git-scm.com/downloads)
* [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
* CORS Unblock add-on for browser
	* [Firefox](https://addons.mozilla.org/en-US/firefox/addon/cors-unblock/)
	* [Chrome](https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino?hl=en)
* Add `API User` permission to the sterling's User Account accessing the User Interface

### Installation

1. Clone the repo
```sh
git clone https://github.com/kreddys/sterlingb2b-codelist-ui.git
```
2. cd to project directory
```sh
cd <yourpath>\sterlingb2b-codelist-ui
```
2. Install dependencies
```sh
yarn install
```
3. configure `sterlingb2b-codelist-ui\src\config\config.json`

4. Start the application
```sh
npm run start
```

## Config

* b2b_rest_endpoint_codelistcodes --> your sterling b2b's codelistcodes api url (http://sterlingb2bservername:20074/B2BAPIs/svc/codelistcodes/)
* b2b_rest_endpoint_codelists --> your sterling b2b's codelistcodes api url (http://sterlingb2bservername:20074/B2BAPIs/svc/codelists/)
* replace_pipe_with --> harcoded to *
* codelists[		--> List all the codelists that you need displayed in the User Interface
	{
	* name			--> Codelist name in Sterling Integrator
	* label			--> Custom name for the codelist
	* listVersion	--> Version of the codelist to be displayed in the UI? Defaulted to -1 if nothing is specified. [Old versions of b2bAPI's doesn't support -1, Set the current default version number in that case]
	* list_and_filter[	--> Columns configured in this array will be displayed in the list page for each codelist
		{
		* source	--> SenderCode (or) ReceiverCode (or) Description (or) Text1 (or) Text2 (or)... Text9
		* label		--> Custom name for the column
		}
	]
	* create_and_edit[	--> Columns configured in this array will be displayed in the edit page when a codelist entry is selected
		{
		* source	--> SenderCode (or) ReceiverCode (or) Description (or) Text1 (or) Text2 (or)... Text9
		* label		--> Custom name for the column
		* required	--> true (or) false
		}
	]
]


## Usage

* At the login page, Login with the same credentials you login to Sterling dashboard
* All codelists configured in config.json will be displayed as tabs on the left side of the page
* Filters can be applied to all columns displayed in the list
	* Filters are case insesitive & works for sub-strings
* Click on any entry to view a particular codelist's entries
* Use the clone button on top right to clone an entry
* Save Button will be enabled if any changes are done an existing code
* Delete button deletes that code from the codelist
* Updating a codelist code works only when CORS Unblock is enabled

* There is an examples folder in this repository which has 2 codelist exports from Sterling Integrator. You can import them in SI and test the tool. 
* The config.json file that comes with this project is configured for these two example codelists.

**There is a catch. This tool doesn't create versions of a codelist like SI. Any updates are done directly in the defaultVersion**


## Future Enhancements

* Versioning Support
* Add Export & Import functionality for codelistcodes.
* ReadOnly access support for User accounts
* Add support for codelists that contain pipe(|) in SenderCode or ReceiverCode

## Contributing

Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## License

Distributed under the MIT License.


<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/kishore-reddy-8309b235/
[sterling-b2b-codelist]: images/sterling-b2b-codelist.JPG
[react-admin-list]: images/react-admin-list.JPG