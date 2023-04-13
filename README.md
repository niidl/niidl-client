<br />
<div align="center">

  <h3 align="center">niidl</h3>

  <p align="center">
    Backend of niidl.co, an App created for intermediate coders as a place to search for and collaborate on code.
    <br />
    <a href="https://github.com/niidl/niidl-client"><strong>Check out our org on GitHub</strong></a>
    <br />
    <a href="https://github.com/niidl/niidl-client"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/niidl/niidl-client/issues">Report Bug</a>
    ·
    <a href="https://github.com/niidl/niidl-client/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#notes">Notes</a></li>
      </ul>
    </li>
       <li>
      <a href="#basic-outline">Basic Outline</a>
      <ul>
        <li><a href="#api">Primary APIs</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

[niidl](https://niidl.co)

Learning to code can be a daunting task. There are plenty of resources on how to get started, but once you understand the basics, you are thrust directly into the world of complex projects with intimidating code bases, and no direction. Here at niidl, we aim to bridge that gap by connecting engineers with projects that resonate with them, through advanced search features and personalized discussion boards.
For the full story on niidl's inception, please visit our org page!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [![TypeScript][typescript]][typescript-url]
- [![NextJS][nextjs]][nextjs-url]
- [![Firebase][firebase]][firebase-url]
- [![Vercel][vercel]][vercel-url]
- [![Docker][docker]][docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.
Please keep in mind this repo only includes the frontend, you will also need fork niidl's server side repo which can be found here:
[niidl-server](https://github.com/niidl/niidl-server)

### Prerequisites

You will need to create a [![Firebase][firebase.js]][firebase-url] account for the authentication process, if you do not have one already.
Our App's frontend has been deployed using [![Vercel][vercel]][vercel-url], which has a solid free tier plan, however, it does not allow for multiple users to share a project. We got around this by having only our Tech Lead create an account and work through deployment. Another way to get around this restriction would be to share the account between multiple people, which we do not recommend. If you are working solo, you can disregard this entirely.
For another option, we recommend [![Render][render.com]][render-url] as it is one of the few free deployment platforms on the market, but please be aware that it can be quite slow.

### Installation

_Below you will find the basics on installation and set up._
_Please note you will need to follow the steps found on [niidl-server](https://github.com/niidl/niidl-server) before any deployment can be done._

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Module Installation
   ```sh
   npm install
   ```
3. Run Client
   The default port is set to localhost:8080.
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Basic Outline

The following is a rough breakdown for the client side of the application.

### Major APIs Used

For this project, we make use of several APIs including [![Firebase][firebase]][firebase-url] and [GitHub](https://docs.github.com/en/rest?apiVersion=2022-11-28).

#### Firebase

[![Firebase][firebase]][firebase-url] is used for authentication via GitHub exclusively. Using it's framework, we handle user sign in and keep user data secure. Because we create our own session tokens via Crypto by [![Node][node.js]][node-url] we query for Firebase for the following:

- UID
- Email
  These are then used in the query to the GitHub API to ensure we are accessing the correct user. As Username and Photo can be changed at any point, those are updated each time a user logs in, while the rest remain constant.

#### GitHub API

The documentation for [GitHub's API](https://docs.github.com/en/rest?apiVersion=2022-11-28) is extensive and is utilized throughout the build. It is used to get information including the following:

- User Info
  - Username
  - GitHub Photo
- Repository Info
  - Repo Name
  - Repo Issues
  - Repo Code

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

The usage for this resource as stated above is to create an place for coders to collaborate on projects with a more robust search function and better filtering. As GitHub primarily filters off languages and keywords, this tends to leave much to be desired when looking for a project that resonates with engineers looking to help others. We also wanted a place where relatively inexperienced coders would have the opportunity to offer their skills without feeling judged. We know how high the perceived barrier to entry can be for working on "major projects" and wanted to make that feel more accessible.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

#### MVP

- [x] Broader search via GitHub API
  - [x] Incorporate opensource projects
  - [x] Limit functionality to promote project creation through niidl
- [x] Secure authentication via Firebase
  - [x] Cookie utilization
- [x] User Features
  - [x] Built out user dashboard
- [x] Discussion Features
  - [x] Sub pages to allow for navigation through
  - [x] Add tabs including new ideas, pinned threads, most popular
  - [x] Allow for upvoting of comments/threads
  - [x] Edit/Delete comments/threads
  - [x] All comments/threads have markdown capability
- [x] UI/UX
  - [x] Redirect to Thread/Project on creation
  - [x] Cover message box with login/signup display if not logged in
  - [x] Search bar with past history

#### V 1.1

- [x] Cookie Modal on first login
- [x] Split tags into categories (language/descriptors)
- [x] Validate GitHub owner so users can only upload their own projects
- [x] Add profile pictures to messages
- [x] Loading animation for transitions
- [x] Allow for markdown to include inline code

#### Future Implementations

- [ ] Multi-language Support
- [ ] Further user dashboard personalization
- [ ] Continue refinement of project categorization and filtering

See the [open issues](https://github.com/Screamtothevoid/Rage/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

- Takuya Stern - [@TrenchTemplar](https://github.com/TrenchTemplar) - AndrewTakuya@gmail.com
- Kaire Montenegro - [@Kai-Animator](https://github.com/Kai-Animator) - kaireml@protonmail.com
- Hideki Fabio Hirose - [@fabiohidekihirose](https://github.com/fabiohidekihirose) - fabiohidekihirose@gmail.com
- Adrian Ang - [@adrianang](https://github.com/adrianang) - adriancbang@gmail.com
- Bryan Cendales - [@MrBCendales](https://github.com/MrBCendales) - bn.cendales10@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

It's impossible to add every single resource that helped to make this possible, but below you will find a few.

- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[typescript]: https://img.shields.io/badge/TypeScript-007acc?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[nextjs]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[nextjs-url]: https://nextjs.org/
[vercel]: https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[vercel-url]: https://vercel.com
[firebase]: https://img.shields.io/badge/Firebase-2C384A?style=for-the-badge&logo=firebase&logoColor=FFA000
[firebase-url]: https://www.firebase.google.com
[docker]: https://img.shields.io/badge/docker-384d54?style=for-the-badge&logo=docker&logoColor=0db7ed
[docker-url]: https://www.docker.com
