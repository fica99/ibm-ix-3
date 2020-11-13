FROM python

RUN mkdir -p /ibm-ix-3
RUN mkdir -p /ibm-ix-3/backend

WORKDIR /ibm-ix-3/backend

COPY . /ibm-ix-3/backend/

EXPOSE 80

RUN pip install -r requirements.txt
