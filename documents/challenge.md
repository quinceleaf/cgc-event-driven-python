# CloudGuruChallenge: Event-Driven Python on AWS

## Requirements

- **Create** an ETL pipeline that triggers once per day, using Python

- **Ingest** _The New York Times'_ [dataset](https://github.com/nytimes/covid-19-data/blob/master/us.csv?opt_id=oeu1600191814445r0.35186417653774305) of U.S. COVID-19 cases and deaths, updated daily and hosted on [GitHub](https://github.com)

- **Clean/transform** the data into usable data types (ie, parse date string)

- **Combine** this dataset with one maintained by Johns Hopkins, which includes U.S. recovery data

- **Filter** the JHU dataset to only include data from the U.S. and remove any days that do not exist in both datasets

- **Abstract** all data transformations/manipulations into a separate, single-purpose module

- **Load** transformed dataset into a database of your choice. Each record in the table must include the date, U.S. case count, deaths, and recoveries for a day of the pandemic

- **Notify** any interested consumers that that the daily ETL job has completed. The message should include the number of rows updated in the database

- **Anticipate** the following situations:

  - the entire historical dataset should be loaded into the database on the initial run of the job, and then only apply incremental updates each subsequent day

  - if the input contains any unexpected/malformed input, the code should fail gracefully and report an error message via SNS.

  - the next time the job runs following an error, it should remember that it did not succeed in processing the previous data, and try again before moving on to more recent data.

- **Write** unit tests to ensure that the code can handle malformed input as desired

- **Define** all infrastructure for this product as code (IaC)

- **Store** all code and configuration under source control

- **Visualize** the data on a dashboard that reports U.S. case counts, fatality, and recoveries over time

- **Report** your learnings and approach to the challenge in a blog post and link to your visualization

## Links

- [#CloudGuruChallenge – Event-Driven Python on AWS](https://acloudguru.com/blog/engineering/cloudguruchallenge-python-aws-etl)
- [Introducing the #CloudGuruChallenge](https://acloudguru.com/blog/news/introducing-the-cloudguruchallenge)
- [A hygienic Python setup for Linux, Mac, and WSL](https://read.acloud.guru/my-python-setup-77c57a2fc4b6)
