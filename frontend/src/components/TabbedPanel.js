const TabbedPanel = ({ activeTab, setActiveTab }) => {
  return (
    <div className="lg:mt-0 mt-3 mb-5 block lg:hidden">
      <ul class="flex border-b">
        <li class="-mb-px mr-1">
          <a
            class={
              activeTab === "table"
                ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                : "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
            }
            href="#"
            onClick={() => setActiveTab("table")}
          >
            Table
          </a>
        </li>
        <li class="mr-1">
          <a
            class={
              activeTab === "chart"
                ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                : "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
            }
            href="#"
            onClick={() => setActiveTab("chart")}
          >
            Chart
          </a>
        </li>
        <li class="mr-1">
          <a
            class={
              activeTab === "doughnut"
                ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                : "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
            }
            href="#"
            onClick={() => setActiveTab("doughnut")}
          >
            Doughnut
          </a>
        </li>
        <li class="mr-1">
          <a
            class={
              activeTab === "toolbar"
                ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                : "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
            }
            href="#"
            onClick={() => setActiveTab("toolbar")}
          >
            Toolbar
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TabbedPanel;
