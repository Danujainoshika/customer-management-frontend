import apiclient from "../api/axios";

const customerService = {
    async getCustomers(page, size) {
        const response = await apiclient.get("/customers",{
            params: {page, size}
        });
    return {
        customers: response.data.content,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
    };
    },

    async getCustomerById(id) {
        const response = await apiclient.get(`/customers/${id}`);
        return response.data;
    },
    async createCustomer(customer) {
        const response = await apiclient.post("/customers", customer);
        return response.data;
    },
    async updateCustomer(id, data) {
        const res = await apiclient.put(`/customers/${id}`, data);
        return res.data;
    },async uploadBulkCustomers(file, onProgress) {
        const formData  = new FormData();
        formData.append("file",file);
        

        const response = await apiclient.post("/customers/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data", 
            },
            
            onUploadProgress: (progressEvent) => {
                if (onProgress) {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    onProgress(percentCompleted);
                }
            },
        });
        return response.data;
    }
}

export default customerService;