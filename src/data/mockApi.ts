import { FormConfig } from '../types/form';

const formConfigs: Record<string, FormConfig> = {
  userInfo: {
    fields: [
      { name: "firstName", type: "text", label: "First Name", required: true },
      { name: "lastName", type: "text", label: "Last Name", required: true },
      { name: "age", type: "number", label: "Age", required: false },
      { name: "email", type: "email", label: "Email", required: true },
      { name: "phone", type: "tel", label: "Phone Number", required: false },
      { name: "birthDate", type: "date", label: "Date of Birth", required: true },
      { name: "gender", type: "radio", label: "Gender", options: ["Male", "Female", "Other", "Prefer not to say"], required: true },
      { name: "interests", type: "checkbox", label: "Interests", options: ["Sports", "Music", "Reading", "Travel", "Technology"], required: false }
    ]
  },
  address: {
    fields: [
      { name: "street", type: "text", label: "Street Address", required: true },
      { name: "apartment", type: "text", label: "Apartment/Suite", required: false },
      { name: "city", type: "text", label: "City", required: true },
      { name: "state", type: "dropdown", label: "State", options: ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"], required: true },
      { name: "zipCode", type: "text", label: "Zip Code", required: true },
      { name: "country", type: "dropdown", label: "Country", options: ["United States", "Canada", "Mexico"], required: true },
      { name: "addressType", type: "radio", label: "Address Type", options: ["Home", "Work", "Other"], required: true },
      { name: "deliveryInstructions", type: "textarea", label: "Delivery Instructions", required: false }
    ]
  },
  payment: {
    fields: [
      { name: "cardholderName", type: "text", label: "Cardholder Name", required: true },
      { name: "cardNumber", type: "text", label: "Card Number", required: true },
      { name: "expiryDate", type: "month", label: "Expiry Date", required: true },
      { name: "cvv", type: "password", label: "CVV", required: true },
      { name: "cardType", type: "radio", label: "Card Type", options: ["Credit", "Debit"], required: true },
      { name: "saveCard", type: "checkbox", label: "Save card for future payments", required: false },
      { name: "billingAddressSame", type: "checkbox", label: "Billing address same as shipping", required: false }
    ]
  },
  jobApplication: {
    fields: [
      { name: "position", type: "dropdown", label: "Position", options: ["Software Engineer", "Product Manager", "UX Designer", "Data Scientist", "DevOps Engineer"], required: true },
      { name: "department", type: "dropdown", label: "Department", options: ["Engineering", "Product", "Design", "Data", "Operations"], required: true },
      { name: "experience", type: "number", label: "Years of Experience", required: true },
      { name: "resume", type: "file", label: "Resume", required: true, accept: ".pdf,.doc,.docx" },
      { name: "coverLetter", type: "file", label: "Cover Letter", required: false, accept: ".pdf,.doc,.docx" },
      { name: "portfolio", type: "url", label: "Portfolio URL", required: false },
      { name: "startDate", type: "date", label: "Available Start Date", required: true },
      { name: "salaryExpectation", type: "number", label: "Expected Annual Salary", required: true },
      { name: "relocate", type: "radio", label: "Willing to Relocate", options: ["Yes", "No"], required: true },
      { name: "references", type: "textarea", label: "References", required: false }
    ]
  },
  survey: {
    fields: [
      { name: "satisfaction", type: "radio", label: "Overall Satisfaction", options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"], required: true },
      { name: "recommendationScore", type: "range", label: "How likely are you to recommend us? (0-10)", min: "0", max: "10", required: true },
      { name: "usedFeatures", type: "checkbox", label: "Features Used", options: ["Product Search", "Shopping Cart", "Wishlist", "Reviews", "Customer Support"], required: true },
      { name: "improvements", type: "textarea", label: "Suggested Improvements", required: false },
      { name: "futureFeatures", type: "checkbox", label: "Features you'd like to see", options: ["Mobile App", "Dark Mode", "Voice Search", "AI Recommendations", "Social Integration"], required: false },
      { name: "feedbackCategory", type: "dropdown", label: "Feedback Category", options: ["User Interface", "Performance", "Features", "Support", "Other"], required: true },
      { name: "contactPermission", type: "checkbox", label: "May we contact you for follow-up?", required: false }
    ]
  },
  contactForm: {
    fields: [
      { name: "fullName", type: "text", label: "Full Name", required: true },
      { name: "email", type: "email", label: "Email Address", required: true },
      { name: "phone", type: "tel", label: "Phone Number", required: false },
      { name: "subject", type: "dropdown", label: "Subject", options: ["General Inquiry", "Technical Support", "Billing Question", "Feature Request", "Bug Report"], required: true },
      { name: "priority", type: "radio", label: "Priority Level", options: ["Low", "Medium", "High", "Urgent"], required: true },
      { name: "message", type: "textarea", label: "Message", required: true },
      { name: "attachments", type: "file", label: "Attachments", required: false, accept: ".pdf,.jpg,.png,.zip", multiple: true },
      { name: "preferredContact", type: "radio", label: "Preferred Contact Method", options: ["Email", "Phone"], required: true },
      { name: "newsletter", type: "checkbox", label: "Subscribe to newsletter", required: false }
    ]
  }
};

export const fetchFormConfig = async (formType: string): Promise<FormConfig> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const config = formConfigs[formType];
      if (config) {
        resolve(config);
      } else {
        reject(new Error('Form configuration not found'));
      }
    }, 500);
  });
};