import React from "react";
import TitlePage from "./Components/TitlePage/TitlePage";
import QuestionsPage from "./Components/QuestionsPage/QuestionsPage";

const App = () => {
	const [currentPage, setCurrentPage] = React.useState("title-page");

	function changePage(Component) {
		setCurrentPage(Component);
	}

	let selectedPage;
	if (currentPage === "title-page") {
		selectedPage = (
			<TitlePage
				changePage={(Component) => {
					changePage(Component);
				}}
			/>
		);
	} else if (currentPage === "questions-page") {
		selectedPage = (
			<QuestionsPage
				changePage={() => {
					changePage();
				}}
			/>
		);
	}

	return <main id="main">{selectedPage}</main>;
};

export default App;
