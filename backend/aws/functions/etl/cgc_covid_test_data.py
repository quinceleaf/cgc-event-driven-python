import unittest

from cgc_covid_fetch_data import fetch_data

# Testing for malformed data:
# Truly malformed data (ie, one row has extra or fewer columns, or not a CSV file) will fail to be parsed by pandas and will throw an error
# Here are testing for parseable datasets that would create problems for our ETL downstream:
# - changes in number of columns
# - changes to column heading

expectations = {
    "NYT": {
        "url": "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv",
        "number_of_columns": 3,
        "column_headings": ["date", "cases", "deaths"],
    },
    "JHU": {
        "url": "https://raw.githubusercontent.com/datasets/covid-19/master/data/time-series-19-covid-combined.csv",
        "number_of_columns": 8,
        "column_headings": [
            "Date",
            "Country/Region",
            "Province/State",
            "Lat",
            "Long",
            "Confirmed",
            "Recovered",
            "Deaths",
        ],
    },
}


class TestForMalformedDataColumnNumberNYT(unittest.TestCase):
    def test_fetch_data(self):
        """
        Test that will fail if data has incorrect # of columns
        """
        target = "NYT"
        url = expectations[target]["url"]
        success, result, errors = fetch_data(url)
        expected_value = expectations[target]["number_of_columns"]
        if success:
            self.assertEqual(result.shape[1], expected_value)


class TestForMalformedDataColumnNumberJHU(unittest.TestCase):
    def test_fetch_data(self):
        """
        Test that will fail if data has incorrect # of columns

        """
        target = "JHU"
        url = expectations[target]["url"]
        success, result, errors = fetch_data(url)
        expected_value = expectations[target]["number_of_columns"]
        if success:
            self.assertEqual(result.shape[1], expected_value)


class TestForMalformedDataColumnHeadingsNYT(unittest.TestCase):
    def test_fetch_data(self):
        """
        Test that will fail if data has incorrect column headings
        """
        target = "NYT"
        url = expectations[target]["url"]
        success, result, errors = fetch_data(url)
        expected_value = expectations[target]["column_headings"]
        if success:
            self.assertListEqual(list(result.columns), expected_value)


class TestForMalformedDataColumnHeadingsJHU(unittest.TestCase):
    def test_fetch_data(self):
        """
        Test that will fail if data has incorrect column headings

        """
        target = "JHU"
        url = expectations[target]["url"]
        success, result, errors = fetch_data(url)
        expected_value = expectations[target]["column_headings"]
        if success:
            self.assertListEqual(list(result.columns), expected_value)


if __name__ == "__main__":
    unittest.main()