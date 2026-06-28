const handleSubmit = async (e) => {
    e.preventDefault();
    if (!menuFilesValid) return;

    const formData = new FormData(e.target);
    const rawData = Object.fromEntries(formData.entries());

    // Prepare payload matching Supabase schema
    const data = { ...rawData };

    // 1. Remove file object (not effectively serializable to JSON/storage not set up yet)
    delete data.menu_files; // Assuming input name is 'menu_files' or similar. 
    // Actually, check input name. If it's the file input, we should exclude it.
    // The previous code had `rawData` containing everything.

    // 2. Arrays
    data.categories = formData.getAll('categories');
    data.service_types = formData.getAll('service_type');
    data.payment_methods = formData.getAll('payment');

    // 3. Resources JSON
    data.resources = resources;

    // 4. Sanitation: Convert empty strings to null for Numeric/Integer fields
    // List of numeric fields based on schema
    const numericFields = [
        'franchise_cost', 'footfall', 'expenses', 'lease', 'rent',
        'sales', 'workers', 'wages', 'profits', 'discount_percent'
    ];

    numericFields.forEach(field => {
        if (data[field] === "") {
            data[field] = null;
        } else if (data[field]) {
            data[field] = Number(data[field]);
        }
    });

    // 5. Handle Boolean (Checkbox) - discount_provided
    // Checkboxes in FormData: exist if checked (value 'on'), missing if unchecked.
    // But duplicate name handling in Object.fromEntries might be tricky.
    // Better to check explicitly using formData.has() or formData.get()
    data.discount_provided = formData.get('discount_provided') === 'on' || formData.get('discount_provided') === 'true';


    console.log('Submitting Data:', data);

    try {
        const response = await api.post('/business-details', data);
        alert('Form submitted successfully!');
        console.log('Response:', response.data);
        // Optional: Redirect
    } catch (error) {
        console.error('Error submitting form:', error);
        // Show server error message if available
        const errMsg = error.response?.data?.error || error.message;
        alert(`Failed to submit form: ${errMsg}`);
    }
};
