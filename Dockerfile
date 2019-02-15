FROM ubuntu:xenial
RUN apt-get update
RUN apt-get install -y npm git android-sdk gradle openjdk-8-jdk

# Fix broken shebang
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN npm install -g cordova

WORKDIR /root
RUN git clone --depth 10 https://github.com/video-game-coding-club/maze-runner.git
WORKDIR /root/maze-runner
RUN cordova create app org.videogamecodingclub MazeRunner
WORKDIR /root/maze-runner/app
RUN cordova telemetry on
RUN cordova platform add android

CMD /bin/bash
