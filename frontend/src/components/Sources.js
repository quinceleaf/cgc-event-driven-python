import { ModalWrapper, Reoverlay } from "reoverlay";

const Sources = () => {
  const closeModal = () => {
    Reoverlay.hideModal();
  };

  return (
    <ModalWrapper contentContainerClassName="mx-10">
      <div className="m-5 mx-10">
        <div className="flex flex-col">
          <div className="mb-3 text-gray-500">
            <div className="lg:text-sm text-xs">
              Data is compiled daily from
              <span className="lg:inline hidden"> the following sources</span>:
              <ul>
                <li className=" mt-3">
                  The New York Times <br />
                  <a
                    className="text-blue-500"
                    href="https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv"
                    target="_blank"
                  >
                    COVID-19 reported cases, United States
                  </a>
                </li>
                <li className="  mt-3">
                  The Johns Hopkins University <br />
                  <a
                    className="text-blue-500"
                    href="https://raw.githubusercontent.com/datasets/covid-19/master/data/time-series-19-covid-combined.csv"
                    target="_blank"
                  >
                    COVID-19 reported cases, globally
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-row justify-center">
            <button
              className="p-1 px-5 mt-4 h-8 w-full bg-blue-500 text-white rounded-md outline-none disabled:opacity-25"
              type={"button"}
              onClick={() => closeModal()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Sources;
