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
      # - SITE_URL: https://wordwall.example.com
```
