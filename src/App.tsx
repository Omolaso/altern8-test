import { useState } from "react";
import "./App.css";
import useSWR from "swr";
import { fetcher } from "./fetcher";

interface IDataResponse {
	id: number;
	name: string;
}

type Event = React.ChangeEvent<HTMLInputElement>;

function App() {
	const [inputValue, setInputValue] = useState<string>("");
	const [filteredData, setFilteredData] = useState<IDataResponse[]>([]);
	const { data, error, isLoading } = useSWR(
		"https://jsonplaceholder.typicode.com/users",
		fetcher
	);

	const searchData = (e: Event) => {
		setInputValue(e.target.value);

		if (!inputValue) return data;

		const filtered = data.filter((fetched: IDataResponse) =>
			fetched.name
				.trim()
				.toLowerCase()
				.includes(inputValue.trim().toLowerCase())
		);

		setFilteredData(filtered);
	};

	const displayedData: IDataResponse[] =
		filteredData.length > 0 ? filteredData : data;

	if (isLoading)
		return (
			<div className="app">
				<h1>Loading...</h1>
			</div>
		);
	if (error)
		return (
			<div className="app">
				<h1>Cannot load data</h1>
			</div>
		);

	return (
		<div className="app">
			<ul>
				<input value={inputValue} type="text" onChange={(e) => searchData(e)} />
				{displayedData.map((fetched: IDataResponse) => (
					<li key={fetched.id}>
						{fetched.id} - {fetched.name}
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
