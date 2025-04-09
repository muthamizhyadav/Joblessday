import * as Yup from "yup";


export const JobPostSchema = Yup.object().shape({
    industry: Yup.string().required("Industry is Required"),
    role: Yup.string().required("Role Required"),
    department: Yup.string().required("Department Required"),
    designation: Yup.string().required("Designation Required"),
    salaryfrom: Yup.number().required("Salary From Required"),
    salaryto: Yup.number().required("Salary To Required"),
    worklocation: Yup.string().required("Work Location required"),
});


export const SlotSchema = Yup.object().shape({
    postId: Yup.string().required("postId Required"),
    date: Yup.string().required("Date Required"),
    startTime: Yup.string().required("Start Time Required"),
    endTime: Yup.string().required("End Time Required"),
});