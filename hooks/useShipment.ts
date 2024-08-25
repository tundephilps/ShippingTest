import React from "react";
import APIRequest from "@/utils/APIRequest";


const useShipment = () => {
    const [ isLoading, setIsLoading ] = React.useState(true);
    const [ shipments, setShipments ] = React.useState<any>([])
    const [ selectedStatus, setSelectedStatus ] = React.useState<string[]>([]);
    const [ searchInput, setSearchInput ]= React.useState("");
    const [ isMarkedAll, setIsMarkedAll ] = React.useState(false);

    const getShipments = async (filter = {}) => {
        setIsLoading(true);
        const baseUrl = 'https://shippex-demo.bc.brandimic.com/api/method/frappe.client.get_list';

        const fields = JSON.stringify(["origin_state", "name", "destination_state", "status"]);
        const filters = JSON.stringify(filter);
        const url = `${baseUrl}?doctype=AWB&fields=${encodeURIComponent(fields)}&filters=${encodeURIComponent(filters)}`;

        const response = await APIRequest({
            url,
            data : {},
            method : "GET",
            isJSON : true
        })

        if(response.statusCode === 200){
            const updatedShipments = response.message.map((item : any) => ({
                ...item,
                isChecked: false
            }));
            
            setShipments(updatedShipments);
        }

        setIsLoading(false);
    }

    const handleFilter = (status : string) => {
        toggleStatus(status);
        getShipments({
            status : ["like", status]
        });

    }

    const handleSearch = (value = "") => {
        let filter = {};
        if(value){
            filter = {
                name : ["like", value || searchInput]
            }
        }

        getShipments(filter);
    }

    const handleInput = (value : string) => {
        setSearchInput(value)
        handleSearch(value);
    }

    const handleMarkAll = () => {
        const updatedShipments = shipments.map((item : any) => ({
            ...item,
            isChecked: !isMarkedAll
        }));
        
        setShipments(updatedShipments);
        setIsMarkedAll(prev => !prev)
    }

    const toggleStatus = (status: string) => {
        setSelectedStatus((prevState) =>
            prevState.includes(status)
            ? prevState.filter((s) => s !== status)
            : [...prevState, status]
        );
    };

 
    React.useEffect(() => {
        getShipments();
    }, [])

    return {
        isLoading,
        shipments,
        selectedStatus,
        searchInput,
        isMarkedAll,
        handleFilter,
        handleInput,
        handleSearch,
        handleMarkAll
    }
}

export default useShipment;