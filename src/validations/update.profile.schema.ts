import * as Yup from "yup";

export const BasicDetailSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    contact: Yup.string().required("contact required").min(10).max(10),
    DOB: Yup.string().required("DOB required"),
    gender: Yup.string().required("gender required"),
    employmentType: Yup.string().required("employment Type required"),
    address: Yup.string().required("address Type required"),
    headline: Yup.string().required("headline required"),
    state: Yup.string().required("State Required"),
    city: Yup.string().required("city required")
});


export const EducationDetailSchema = Yup.object().shape({
    educationDetails: Yup.object().shape({
        degree: Yup.string().required('Degree is required'),
        institution: Yup.string().required('Institution is required'),
        year: Yup.string().required('Year is required'),
        grade: Yup.string().required('grade/percentage is required'),
        keySkill: Yup.array().min(1, 'At least one skill is required').required('This field is required'),
    }),
});


export const EmploymentDetailSchema = Yup.object().shape({
    employmentDetails: Yup.object().shape({
        company: Yup.string().required('Degree is required'),
        jobTitle: Yup.string().required('Institution is required'),
        startDate: Yup.string().required('Year is required'),
        endDate: Yup.string().required('grade/percentage is required'),
        responsibility: Yup.string().required('responsibility is required'),
    }),
});

export const companyDetailSchema = Yup.object().shape({
    companyName: Yup.string().required('companyName is required'),
    state: Yup.string().required('This field is required'),
    city: Yup.string().required('This field is required'),
    employeeCount: Yup.string().required('employeeCount is required'),
    industry: Yup.string(),
    gst: Yup.string().required('gst is required'),
    companysiteURL: Yup.string(),
    recruiterName: Yup.string().required('recruiterName is required'),
    recruiterDesignation: Yup.string().required('recruiterDesignation is required'),
    stepper: Yup.number()
});

export const ProfileDetailSchema = Yup.object().shape({
    name: Yup.string().required('companyName is required'),
    recruiterDesignation: Yup.string().required('This field is required'),
    companyName: Yup.string().required('This field is required'),
    contact: Yup.string().required('This field is required'),
    email: Yup.string().required('This field is required'),
    city: Yup.string().required('This field is required'),
    state: Yup.string().required('This field is required'),
});

export const ProfilebioSchema = Yup.object().shape({
    bio: Yup.string().required('bio is required'),
});
