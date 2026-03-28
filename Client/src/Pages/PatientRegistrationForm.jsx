import { useState } from "react";

const steps = ["Personal Info", "Contact", "Medical", "Insurance"];

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  background: "#f8fafc",
  border: "1.5px solid #e2e8f0",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#1e293b",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontSize: "12px",
  fontWeight: "600",
  color: "#64748b",
  marginBottom: "5px",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};

const fieldGroupStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
};

function Field({ label, children }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function StyledInput({ ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      style={{
        ...inputStyle,
        borderColor: focused ? "#3b82f6" : "#e2e8f0",
        boxShadow: focused ? "0 0 0 3px rgba(59,130,246,0.12)" : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function StyledSelect({ children, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      {...props}
      style={{
        ...inputStyle,
        borderColor: focused ? "#3b82f6" : "#e2e8f0",
        boxShadow: focused ? "0 0 0 3px rgba(59,130,246,0.12)" : "none",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        paddingRight: "36px",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </select>
  );
}

function StyledTextarea({ ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...props}
      style={{
        ...inputStyle,
        resize: "vertical",
        minHeight: "80px",
        borderColor: focused ? "#3b82f6" : "#e2e8f0",
        boxShadow: focused ? "0 0 0 3px rgba(59,130,246,0.12)" : "none",
        fontFamily: "inherit",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

export default function PatientRegistrationForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", dob: "", gender: "", bloodGroup: "",
    email: "", phone: "", address: "", city: "", state: "", zip: "",
    emergencyName: "", emergencyPhone: "", emergencyRelation: "",
    allergies: "", currentMeds: "", pastConditions: "", smoker: "", height: "", weight: "",
    insuranceProvider: "", policyNumber: "", groupNumber: "", insuredName: "",
  });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const stepContent = [
    // Step 1: Personal Info
    <div key="personal" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={fieldGroupStyle}>
        <Field label="First Name"><StyledInput name="firstName" value={form.firstName} onChange={update} placeholder="John" /></Field>
        <Field label="Last Name"><StyledInput name="lastName" value={form.lastName} onChange={update} placeholder="Doe" /></Field>
      </div>
      <div style={fieldGroupStyle}>
        <Field label="Date of Birth"><StyledInput type="date" name="dob" value={form.dob} onChange={update} /></Field>
        <Field label="Gender">
          <StyledSelect name="gender" value={form.gender} onChange={update}>
            <option value="">Select gender</option>
            <option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option>
          </StyledSelect>
        </Field>
      </div>
      <Field label="Blood Group">
        <StyledSelect name="bloodGroup" value={form.bloodGroup} onChange={update}>
          <option value="">Select blood group</option>
          {["A+","A−","B+","B−","AB+","AB−","O+","O−"].map(b => <option key={b}>{b}</option>)}
        </StyledSelect>
      </Field>
    </div>,

    // Step 2: Contact
    <div key="contact" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={fieldGroupStyle}>
        <Field label="Email Address"><StyledInput type="email" name="email" value={form.email} onChange={update} placeholder="john@example.com" /></Field>
        <Field label="Phone Number"><StyledInput type="tel" name="phone" value={form.phone} onChange={update} placeholder="+91 9876543210" /></Field>
      </div>
      <Field label="Street Address"><StyledInput name="address" value={form.address} onChange={update} placeholder="123 Main Street" /></Field>
      <div style={{ ...fieldGroupStyle, gridTemplateColumns: "2fr 1fr 1fr" }}>
        <Field label="City"><StyledInput name="city" value={form.city} onChange={update} placeholder="Roorkee" /></Field>
        <Field label="State"><StyledInput name="state" value={form.state} onChange={update} placeholder="Uttarakhand" /></Field>
        <Field label="ZIP Code"><StyledInput name="zip" value={form.zip} onChange={update} placeholder="247667" /></Field>
      </div>
      <div style={{ background: "#f0f9ff", borderRadius: "10px", padding: "16px", border: "1px solid #bae6fd" }}>
        <div style={{ fontSize: "12px", fontWeight: "700", color: "#0369a1", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Emergency Contact</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={fieldGroupStyle}>
            <Field label="Full Name"><StyledInput name="emergencyName" value={form.emergencyName} onChange={update} placeholder="Jane Doe" /></Field>
            <Field label="Relationship"><StyledInput name="emergencyRelation" value={form.emergencyRelation} onChange={update} placeholder="Spouse" /></Field>
          </div>
          <Field label="Phone"><StyledInput type="tel" name="emergencyPhone" value={form.emergencyPhone} onChange={update} placeholder="+91 9876543211" /></Field>
        </div>
      </div>
    </div>,

    // Step 3: Medical
    <div key="medical" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={fieldGroupStyle}>
        <Field label="Height (cm)"><StyledInput type="number" name="height" value={form.height} onChange={update} placeholder="170" /></Field>
        <Field label="Weight (kg)"><StyledInput type="number" name="weight" value={form.weight} onChange={update} placeholder="65" /></Field>
      </div>
      <Field label="Smoking Status">
        <StyledSelect name="smoker" value={form.smoker} onChange={update}>
          <option value="">Select</option>
          <option>Non-smoker</option><option>Former smoker</option><option>Current smoker</option>
        </StyledSelect>
      </Field>
      <Field label="Known Allergies"><StyledTextarea name="allergies" value={form.allergies} onChange={update} placeholder="e.g. Penicillin, Pollen, Peanuts..." /></Field>
      <Field label="Current Medications"><StyledTextarea name="currentMeds" value={form.currentMeds} onChange={update} placeholder="List medications and dosages..." /></Field>
      <Field label="Past Medical Conditions"><StyledTextarea name="pastConditions" value={form.pastConditions} onChange={update} placeholder="e.g. Diabetes, Hypertension..." /></Field>
    </div>,

    // Step 4: Insurance
    <div key="insurance" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Field label="Insurance Provider"><StyledInput name="insuranceProvider" value={form.insuranceProvider} onChange={update} placeholder="e.g. Star Health, HDFC ERGO" /></Field>
      <Field label="Name of Insured"><StyledInput name="insuredName" value={form.insuredName} onChange={update} placeholder="As on insurance card" /></Field>
      <div style={fieldGroupStyle}>
        <Field label="Policy Number"><StyledInput name="policyNumber" value={form.policyNumber} onChange={update} placeholder="POL-XXXXXXXX" /></Field>
        <Field label="Group Number"><StyledInput name="groupNumber" value={form.groupNumber} onChange={update} placeholder="GRP-XXXX" /></Field>
      </div>
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "16px", marginTop: "8px" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <input type="checkbox" id="consent" style={{ marginTop: "2px", accentColor: "#16a34a" }} />
          <label htmlFor="consent" style={{ fontSize: "13px", color: "#166534", lineHeight: "1.5" }}>
            I confirm that the information provided is accurate. I consent to the collection and use of my medical data for treatment purposes.
          </label>
        </div>
      </div>
    </div>,
  ];

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", fontFamily: "'Georgia', serif" }}>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "48px 40px", textAlign: "center", maxWidth: "420px", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
          <div style={{ width: "64px", height: "64px", background: "linear-gradient(135deg, #10b981, #059669)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "28px" }}>✓</div>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#0f172a", margin: "0 0 10px" }}>Registration Complete</h2>
          <p style={{ color: "#64748b", fontSize: "15px", margin: "0 0 28px" }}>Welcome, {form.firstName}! Your patient profile has been created. Our team will reach out to confirm your appointment.</p>
          <button onClick={() => { setSubmitted(false); setStep(0); setForm(Object.fromEntries(Object.keys(form).map(k => [k, ""]))); }}
            style={{ background: "#3b82f6", color: "#fff", border: "none", borderRadius: "10px", padding: "12px 28px", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>
            Register Another Patient
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f9ff 0%, #e8f4fd 50%, #f0fdf4 100%)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "580px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#fff", borderRadius: "40px", padding: "8px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: "16px" }}>
            <span style={{ fontSize: "20px" }}>🏥</span>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#0369a1", letterSpacing: "0.08em", textTransform: "uppercase" }}>HealthCare Portal</span>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px", letterSpacing: "-0.5px" }}>Patient Registration</h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Please fill in your information accurately</p>
        </div>

        {/* Step Indicator */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "28px" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", fontWeight: "700", transition: "all 0.3s",
                  background: i < step ? "#3b82f6" : i === step ? "#1d4ed8" : "#e2e8f0",
                  color: i <= step ? "#fff" : "#94a3b8",
                  boxShadow: i === step ? "0 0 0 4px rgba(59,130,246,0.2)" : "none",
                }}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: "10px", fontWeight: "600", color: i === step ? "#1d4ed8" : "#94a3b8", marginTop: "4px", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.04em" }}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ height: "2px", flex: 1, background: i < step ? "#3b82f6" : "#e2e8f0", marginBottom: "18px", transition: "background 0.3s" }} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
          <h2 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: "0 0 22px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ background: "#eff6ff", color: "#3b82f6", borderRadius: "8px", padding: "4px 10px", fontSize: "12px" }}>Step {step + 1}/{steps.length}</span>
            {steps[step]}
          </h2>
          {stepContent[step]}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "28px", paddingTop: "20px", borderTop: "1px solid #f1f5f9" }}>
            <button
              onClick={() => setStep(s => s - 1)}
              disabled={step === 0}
              style={{ padding: "10px 22px", borderRadius: "10px", border: "1.5px solid #e2e8f0", background: "#fff", color: step === 0 ? "#cbd5e1" : "#475569", fontWeight: "600", fontSize: "14px", cursor: step === 0 ? "not-allowed" : "pointer", transition: "all 0.2s" }}
            >
              ← Back
            </button>
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>{step + 1} of {steps.length}</span>
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                style={{ padding: "10px 24px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", color: "#fff", fontWeight: "700", fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 14px rgba(59,130,246,0.35)" }}
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                style={{ padding: "10px 24px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", fontWeight: "700", fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 14px rgba(16,185,129,0.35)" }}
              >
                Submit ✓
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
