"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { getAllItems } from "@/app/api/route";
import CreateCrop from "@/components/crop/CreateCrop";
import EditeCrop from "@/components/crop/EditeCrop";
import DisplayCrop from "@/components/crop/DisplayCrop";

const ProductCrops = () => {
	const [isCreateForm, setIsCreateForm] = useState(true);
	const [dataOneCrop, setDataOneCrop] = useState({});
	const [data, setData] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const dataCollection = "crop";
				const cropData = await getAllItems(dataCollection);
				setData(cropData);
				setLoaded(true);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const removeFromDom = (itemId) => {
		setData((prevData) => prevData.filter((item) => item._id !== itemId));
	};

	const addFromDom = (newData) => {
		setData((prevData) => [...prevData, newData]);
	};

	const updateData = (updatedProduct) => {
		setData((prevData) =>
			prevData.map((item) =>
				item._id === updatedProduct._id ? updatedProduct : item
			)
		);
	};

	const filterProductById = (id) => {
		return data.find((item) => item._id === id);
	};

	const defineEditForm = (id) => {
		setIsCreateForm(false);
		const filteredProduct = filterProductById(id);
		setDataOneCrop(filteredProduct);
	};

	const defineCreationForm = (updatedProduct) => {
		updateData(updatedProduct);
		setIsCreateForm(true);
	};

	return (
		loaded && (
			<Box sx={{ width: "100%" }}>
				<Grid
					container
					rowSpacing={1}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
				>
					<Grid item xs={4}>
						{isCreateForm ? (
							<CreateCrop addProduct={addFromDom} />
						) : (
							<EditeCrop
								dataCrop={dataOneCrop}
								redefineCreationForm={defineCreationForm}
							/>
						)}
					</Grid>
					<Grid item xs={8}>
						<Box>
							<DisplayCrop
								handleFormType={defineEditForm}
								removeFromDom={removeFromDom}
								dataCropProducts={data}
							/>
						</Box>
					</Grid>
				</Grid>
			</Box>
		)
	);
};

export default ProductCrops;
