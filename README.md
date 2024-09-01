# WordWall

*Simple, Self-Hosted, Collaborative Word Cloud Generator.*

WordWall is a simple word-cloud generator used for collaborative think-sessions
for teams to share thoughts, ideas, opinions and more. The tool attempts to
provide simple options to allow live updates in addition to "revealed" walls
whose contents aren't shown until you're ready.

## Theory of Operation

WordWall is intended for use in small-use-settings, and does not employ
authentication. That means that anyone who accesses the tool may create a
collaborative cloud of their own. Anyone who views the collaboration page, of
course, will be allowed to participate immediately.

To support interaction, a temporary SQLite file is managed in order to support
sequences of words entered by participants. Each time the application is started
or restarted, the temporary file containing the SQLite file will be removed,
effectively removing any records of the activities.

## Installation

WordWall is built to be run in a
[Docker](https://docs.docker.com/get-started/overview/)
[container](https://www.redhat.com/en/topics/containers/whats-a-linux-container).
The easiest way to get WordWall started is to use a
[docker-compose](https://docs.docker.com/compose/) configuration to define the
parameters for your application to use. Here's an example:

```yaml
# WordWall Example Configuration
services:
  wordwall:
    image: ghcr.io/engineerjoe440/wordwall:main
    ports:
      - 8082:80
    restart: unless-stopped
    environment:
      # Optional Configuration Parameters
      # - SITE_URL: https://wordwall.example.com
      # - SITE_NAME: WordWall
    volumes:
      - ./config:/server/config

```

## Development

Developing WordWall should be relatively simple. It falls into a few general
steps. Install the `npm` dependencies, build the frontend, install the `python`
dependencies, then run the backend.

### Installing Frontend (`npm`) Dependencies

1. `cd` to the `frontend/` folder.
2. Run the command: `yarn install` (requires [yarn](https://classic.yarnpkg.com/lang/en/docs/install/))

### Building Frontend

1. `cd` to the `frontend/` folder.
2. Run the command `yarn build`. This will generate all of the Javascript/CSS
files needed in the `backend/wordwall/static/react/` folder, and the `index.html`
in `backend/wordwall/templates/`.

### Installing Backend (`python`) Dependencies

1. Create a Python Virtual Environment with `python3 -m venv venv`.
2. Activate the virtual environment.
3. Run the command `pip install -r backend/requirements.txt`

### Run the Application

1. `cd` to the `backend/` folder.
2. Run the command: `uvicorn wordwall.main:app --reload --host 0.0.0.0`. This
will expose the application on all interfaces on the computer running the app.
This will allow you to test the app from other local devices.
