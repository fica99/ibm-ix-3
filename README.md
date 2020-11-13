# ibm-ix-3
🛩 👨‍✈️ ✈️ IBM iX project. Our task is to help the airline to improve the system of distribution of pilots and flight attendants on its flights. This solution will make the appointment of aircrew members to the flight effective and fair. 


## About IBM iX

IBM iX is the largest digital agency according to Ad Age Agency Report - 2014 & 2015. IBM iX provides business with a new generation of services to create personalized interaction. With the help of IBM iX experts you can look at the experience of your clients from a new perspective.

IBM iX employees work in more than 57 global IBM Studios to create solutions for customers such as Nationwide, Jaguar's Landrover, Citi and Wimbledon.

## Description of the reception and management service pilot applications

### Why does the airline want to do this service?

**Trouble**: Appointment of pilots for flights in the current system of work leads to the formation of schedules of different degrees of comfort for employees: someone gets profitable transatlantic flights, and someone gets short turnaround flights (for example, Moscow - St. Petersburg). Moreover, what is comfortable for one pilot may be completely unacceptable for another. In order to solve this problem, it is necessary to develop a system of receiving applications.

**How this problem is solved now and what is not satisfied?**

At the moment the distribution of pilots and flight attendants for the flight is done with the help of direct assignments. It is done manually, which requires a lot of resources. It is impossible to achieve a result, which would satisfy the maximum number of pilots with this approach. Also the graphical model is opaque for pilots.

**Scheduled solution:** Modern approach to the problem of fair consideration of preferences for flight schedule creation is [Preferential Bidding System (PBS)](https://en.wikipedia.org/wiki/Preferential_bidding_system).

PBS offers to generate pilots' schedules based on **pilot requests** and **priority rating** (seniority). This will allow the airline to significantly increase staff satisfaction and reduce staff turnover.

### Functional **services**

Pilots do not apply for a particular flight, but indicate their wishes for flights and assign priority points to each type of application. The application system uses many parameters: someone prefers to fly only during the day, someone - to work on weekends, and some pilots have favorite countries for flights.

We offer 5 types of applications:

- Direction of flight
- Working Shift Duration
- The desire to work with recycling
- Choice of weekends
- Departure time.

For the selected types of applications the functionality of their indication can be offered independently, so that the variability of applications submission is maximal.


## Deployment

```
$> git clone git@github.com:fica99/ibm-ix-3.git
$> cd ibm-ix-3
$> docker-compose build
$> docker-compose up
```

Open http://0.0.0.0:5000 in your browser.