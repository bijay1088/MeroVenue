import React, { Component } from 'react';

import { CanvasJSChart, CanvasJS } from 'canvasjs-react-charts'
import {
	MDBCard,
	MDBCardTitle,
	MDBCardBody,
	MDBCardHeader,
	MDBCardText
} from 'mdb-react-ui-kit';
import { useEffect } from 'react';

import "./dashboard.css";




export default function Dashboard() {

	const [user, setUser] = React.useState(0);
	const [venue, setVenue] = React.useState(0);
	const [service, setService] = React.useState(0);
	const [vendor, setVendor] = React.useState(0);
	const [customer, setCustomer] = React.useState(0);
	const [manager, setManager] = React.useState(0);

	useEffect(() => {
		getUser();
	}, [service]);

	function getUser() {
		fetch(`http://localhost:5000/getNumberOfUsers`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				setUser(data.data);
			});

		fetch(`http://localhost:5000/getNumberOfVenues`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				setVenue(data.data);
			});

		fetch(`http://localhost:5000/getNumberOfServices`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				setService(data.data);
			});

		fetch(`http://localhost:5000/getNumberOfCustomers`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				setCustomer(data.data);
			});

		fetch(`http://localhost:5000/getNumberOfVendors`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				setVendor(data.data);
			});

		fetch(`http://localhost:5000/getNumberOfManagers`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				setManager(data.data);
			});
	};




	

	const options = {
		animationEnabled: true,
		exportEnabled: true,
		theme: "light2", //"light1", "dark1", "dark2"
		title: {
			text: "Overall info"
		},
		axisY: {
			includeZero: true
		},
		data: [{
			type: "column", //change type to bar, line, area, pie, etc
			//indexLabel: "{y}", //Shows y value on all Data Points
			indexLabelFontColor: "#5A5757",
			indexLabelPlacement: "outside",
			dataPoints: [
				{ label: "Users", y: user },
				{ label: "Venues", y: venue },
				{ label: "Services", y: service },
				{ label: "Managers", y: manager }
			]
		}]
	}

	const options2 = {
		animationEnabled: true,
		exportEnabled: true,
		theme: "light2", //"light1", "dark1", "dark2"
		title: {
			text: "Users"
		},
		axisY: {
			includeZero: true
		},
		data: [{
			type: "pie", //change type to bar, line, area, pie, etc
			//indexLabel: "{y}", //Shows y value on all Data Points
			indexLabelFontColor: "#5A5757",
			indexLabelPlacement: "outside",
			dataPoints: [
				{ label: "Customers", y: customer },
				{ label: "Vendors", y: vendor }
			]
		}]
	}

	
	return (
		<div class="mt-3 px-3">

			<div class="row inform-card my-3 bg-light m-5">

				<div className="flex d-flex justify-content-center mt-5 mb-5">
					<h3>Users Statistics</h3>
				</div>

				<div class="col-lg-2 col-md-6 col-10 mx-auto dashcard">
					<a href="/users">
						<MDBCard background="light" className='mb-3 w-7'>
							<MDBCardHeader className="flex d-flex justify-content-center">
								<i class="fa fa-users icon p-1"></i>
								Users
							</MDBCardHeader>
							<MDBCardBody>
								<MDBCardTitle className="flex d-flex justify-content-center">{user}</MDBCardTitle>
							</MDBCardBody>
						</MDBCard>
					</a>
				</div>

				<div class="col-lg-2 col-md-6 col-10 mx-auto dashcard">
					<a href="/users">
						<MDBCard background="light" className='mb-3 w-7'>
							<MDBCardHeader className="flex d-flex justify-content-center">
								<i class="fa fa-user icon p-1"></i>
								Customers
							</MDBCardHeader>
							<MDBCardBody>
								<MDBCardTitle className="flex d-flex justify-content-center">{customer}</MDBCardTitle>
							</MDBCardBody>
						</MDBCard>
					</a>
				</div>


				<div class="col-lg-2 col-md-6 col-10 mx-auto dashcard">
					<a href="/users">
						<MDBCard background="light" className='mb-3 w-7'>
							<MDBCardHeader className="flex d-flex justify-content-center">
								<i class="fa fa-shop icon p-1"></i>
								Vendors
							</MDBCardHeader>
							<MDBCardBody>
								<MDBCardTitle className="flex d-flex justify-content-center">{vendor}</MDBCardTitle>
							</MDBCardBody>
						</MDBCard>
					</a>
				</div>

			</div>


			<div class="row inform-card my-3 bg-light m-5">

				<div className="flex d-flex justify-content-center mt-5 mb-5">
					<h3>Service Statistics</h3>
				</div>

				<div class="col-lg-2 col-md-6 col-10 mx-auto dashcard">
					<a href="/venue">
						<MDBCard background="light" className='mb-3 w-7'>
							<MDBCardHeader className="flex d-flex justify-content-center">
								<i class="fa fa-store icon p-1"></i>
								Venues
							</MDBCardHeader>
							<MDBCardBody>
								<MDBCardTitle className="flex d-flex justify-content-center">{venue}</MDBCardTitle>
							</MDBCardBody>
						</MDBCard>
					</a>
				</div>

				<div class="col-lg-2 col-md-6 col-10 mx-auto dashcard">
					<a href="/service">
						<MDBCard background="light" className='mb-3 w-7'>
							<MDBCardHeader className="flex d-flex justify-content-center">
								<i class="fa fa-camera icon p-1"></i>
								Services
							</MDBCardHeader>
							<MDBCardBody>
								<MDBCardTitle className="flex d-flex justify-content-center">{service}</MDBCardTitle>
							</MDBCardBody>
						</MDBCard>
					</a>
				</div>

				<div class="col-lg-2 col-md-6 col-10 mx-auto dashcard">
					<a href="/service">
						<MDBCard background="light" className='mb-3 w-7'>
							<MDBCardHeader className="flex d-flex justify-content-center">
								<i class="fa-solid fa-user-tie p-1"></i>
								Manager Created
							</MDBCardHeader>
							<MDBCardBody>
								<MDBCardTitle className="flex d-flex justify-content-center">{manager}</MDBCardTitle>
							</MDBCardBody>
						</MDBCard>
					</a>
				</div>

			</div>

			<div class="row inform-card my-3 bg-light mt-5 mb-5 ">
				<div class="col-sm-12 col-md-12 col-lg-6 mt-5 ">
					<CanvasJSChart options={options}/>
				</div>
				
			</div>
		</div>



		//<div>

		//	<MDBCard background="light" className='mb-3 card'>
		//		<MDBCardHeader>Users</MDBCardHeader>
		//		<MDBCardBody>
		//			<MDBCardTitle>Number of Users</MDBCardTitle>
		//			<MDBCardText>
		//				{user }
		//			</MDBCardText>
		//		</MDBCardBody>
		//	</MDBCard>

		//	<MDBCard background="light" className='mb-3 card'>
		//		<MDBCardHeader>Venue</MDBCardHeader>
		//		<MDBCardBody>
		//			<MDBCardTitle>Number of Venues</MDBCardTitle>
		//			<MDBCardText>
		//				{venue}
		//			</MDBCardText>
		//		</MDBCardBody>
		//	</MDBCard>

		//	<MDBCard background="light" className='mb-3 card'>
		//		<MDBCardHeader>Service</MDBCardHeader>
		//		<MDBCardBody>
		//			<MDBCardTitle>Number of Services</MDBCardTitle>
		//			<MDBCardText>
		//				{service}
		//			</MDBCardText>
		//		</MDBCardBody>
		//	</MDBCard>


		//	<CanvasJSChart options={options}
		//	/* onRef={ref => this.chart = ref} */
		//	/>
		//	{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}

		//	<CanvasJSChart options={options2} />
		//</div>


	);



    
}
