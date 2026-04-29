import api from './axios';

// ── Users ──────────────────────────────────────────────────────────────────
export const AdminGetAllUsers = async () => {
    const response = await api.get('/api/users');
    return response.data;
};

export const AdminDeleteUser = async (id) => {
    // Issue 9 fix: fetch user first to know their role, then delete the linked entity
    // before deleting the user account — otherwise the entity row is orphaned.
    const userRes = await api.get(`/api/users/${id}`);
    const user = userRes.data?.data;

    if (user?.role === 'HOSPITAL') {
        try {
            const hospitalRes = await api.get(`/api/hospitals/user/${id}`);
            const hospitalId = hospitalRes.data?.data?.id;
            if (hospitalId) await api.delete(`/api/hospitals/${hospitalId}`);
        } catch { /* entity may not exist, that's fine */ }
    } else if (user?.role === 'DOCTOR') {
        try {
            const doctorRes = await api.get(`/api/doctors/user/${id}`);
            const doctorId = doctorRes.data?.id;
            if (doctorId) await api.delete(`/api/doctors/${doctorId}`);
        } catch { /* entity may not exist */ }
    } else if (user?.role === 'PATIENT') {
        try {
            const patientRes = await api.get(`/api/patients/user/${id}`);
            const patientId = patientRes.data?.id;
            if (patientId) await api.delete(`/api/patients/${patientId}`);
        } catch { /* entity may not exist */ }
    }

    // Finally delete the user account itself
    const response = await api.delete(`/api/users/${id}`);
    return response.data;
};

// ── Register (creates user + profile row via /api/auth/register) ───────────
export const AdminRegisterUser = async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
};

// ── Hospitals ─────────────────────────────────────────────────────────────
export const AdminGetAllHospitals = async () => {
    const response = await api.get('/api/hospitals');
    return response.data;
};

export const AdminCreateHospital = async (data) => {
    // data: { name, email, password, address, city }

    // Step 1 – register the hospital user (this auto-creates a hospital row with just the name)
    const registerRes = await api.post('/api/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'HOSPITAL',
    });
    if (!registerRes.data?.success) throw new Error(registerRes.data?.message || 'Registration failed');

    // Step 2 – fetch the newly created user to get their userId
    const userRes = await api.get(`/api/users/email?email=${encodeURIComponent(data.email)}`);
    const userId = userRes.data?.data?.id;
    if (!userId) throw new Error('Could not retrieve new user ID after registration');

    // Step 3 – fetch the hospital row that was auto-created for this userId
    const hospitalFetchRes = await api.get(`/api/hospitals/user/${userId}`);
    const hospitalId = hospitalFetchRes.data?.data?.id;
    if (!hospitalId) throw new Error('Could not retrieve hospital record after registration');

    // Step 4 – PUT to update the hospital with address and city
    const updateRes = await api.put(`/api/hospitals/${hospitalId}`, {
        name: data.name,
        address: data.address,
        city: data.city,
    });
    return updateRes.data;
};

export const AdminDeleteHospital = async (id) => {
    // Issue 8 fix: fetch the hospital to get its userId, then cascade-delete the user account too.
    const hospitalRes = await api.get(`/api/hospitals/${id}`);
    const userId = hospitalRes.data?.data?.userId;

    await api.delete(`/api/hospitals/${id}`);

    if (userId) {
        try { await api.delete(`/api/users/${userId}`); } catch { /* best-effort */ }
    }
};

// ── Doctors ───────────────────────────────────────────────────────────────
export const AdminGetAllDoctors = async () => {
    const response = await api.get('/api/doctors');
    return response.data;
};

export const AdminCreateDoctor = async (data) => {
    // data: { name, email, password, specialization, experience, hospitalId? }

    // Step 1 – register the doctor user (auto-creates a doctor row with just the name)
    const registerRes = await api.post('/api/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'DOCTOR',
    });
    if (!registerRes.data?.success) throw new Error(registerRes.data?.message || 'Registration failed');

    // Step 2 – fetch the newly created user to get their userId
    const userRes = await api.get(`/api/users/email?email=${encodeURIComponent(data.email)}`);
    const userId = userRes.data?.data?.id;
    if (!userId) throw new Error('Could not retrieve new user ID after registration');

    // Step 3 – fetch the doctor row auto-created for this userId
    const doctorFetchRes = await api.get(`/api/doctors/user/${userId}`);
    const doctor = doctorFetchRes.data;
    const doctorId = doctor?.id;
    if (!doctorId) throw new Error('Could not retrieve doctor record after registration');

    // Step 4 – PUT to update with specialization, experience, hospitalId
    const updatePayload = {
        name: data.name,
        specialization: data.specialization || null,
        experience: data.experience ? Number(data.experience) : 0,
    };
    if (data.hospitalId) {
        updatePayload.hospital = { id: Number(data.hospitalId) };
    }
    const updateRes = await api.put(`/api/doctors/${doctorId}`, updatePayload);
    return updateRes.data;
};

export const AdminDeleteDoctor = async (id) => {
    // Issue 8 fix: fetch the doctor to get its userId, then cascade-delete the user account too.
    const doctorRes = await api.get(`/api/doctors/${id}`);
    const userId = doctorRes.data?.userId;

    await api.delete(`/api/doctors/${id}`);

    if (userId) {
        try { await api.delete(`/api/users/${userId}`); } catch { /* best-effort */ }
    }
};

// ── Patients ──────────────────────────────────────────────────────────────
export const AdminGetAllPatients = async () => {
    const response = await api.get('/api/patients');
    return response.data;
};

export const AdminDeletePatient = async (id) => {
    // Issue 8 fix: fetch the patient to get its userId, then cascade-delete the user account too.
    const patientRes = await api.get(`/api/patients/${id}`);
    const userId = patientRes.data?.userId;

    await api.delete(`/api/patients/${id}`);

    if (userId) {
        try { await api.delete(`/api/users/${userId}`); } catch { /* best-effort */ }
    }
};

// ── Appointments ──────────────────────────────────────────────────────────
export const AdminGetAllAppointments = async () => {
    const response = await api.get('/api/appointments');
    return response.data;
};
