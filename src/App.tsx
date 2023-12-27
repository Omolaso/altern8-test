import { useState, useEffect } from "react";
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

	const fetchedData: IDataResponse[] = data;

	useEffect(() => {
		setFilteredData(fetchedData);
	}, [fetchedData]);

	const searchData = () => {
		const filtered = fetchedData.filter((fetched: IDataResponse) =>
			fetched.name
				.trim()
				.toLowerCase()
				.includes(inputValue.trim().toLowerCase())
		);

		setFilteredData(filtered);
	};

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
				<input
					value={inputValue}
					type="text"
					onKeyUp={() => searchData()}
					onChange={(e: Event) => setInputValue(e.target.value)}
				/>
				{filteredData?.map((fetched: IDataResponse) => (
					<li key={fetched.id}>
						{fetched.id} - {fetched.name}
					</li>
				))}
			</ul>
			{!isLoading && filteredData?.length < 1 && <h1>No Match</h1>}
		</div>
	);
}

export default App;
