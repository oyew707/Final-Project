FROM node:latest
RUN apt-get update
RUN apt-get upgrade -y
RUN apt install python3 -y
RUN apt-get install python3-pip -y
RUN pip3 freeze > requirements.txt
RUN pip3 install -r requirements.txt
RUN pip3 install numpy==1.13.0
RUN mkdir -p /home/node/app
WORKDIR home/node/app/
COPY . /home/node/app/
RUN npm install npm install -g npm@7.8.0
RUN npm install
RUN npm install concurrently -g
ENTRYPOINT npm run dev
EXPOSE 80
EXPOSE 6789