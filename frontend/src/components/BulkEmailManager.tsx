import { useState, useEffect } from "react";
import axiosIstance from "../api/axios";

interface Template {
  id: number;
  name: string;
  subject: string;
  content: string;
}

interface RecipientList {
  id: number;
  name: string;
  recipients: string[];
}

interface EmailPayload {
  recipients: string[];
  subject: string;
  html: string;
}

const BulkEmailManager = (): JSX.Element => {
  // Initialize with empty arrays
  const [templates, setTemplates] = useState<Template[]>([]);
  const [recipientLists, setRecipientLists] = useState<RecipientList[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);
  const [selectedRecipientList, setSelectedRecipientList] = useState<number>(0);
  const [sendingStatus, setSendingStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // New template form state
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    subject: "",
    content: "",
  });

  // New recipient list form state
  const [newRecipientList, setNewRecipientList] = useState({
    name: "",
    recipients: "",
  });

  // Fetch data on component mount
  useEffect(() => {
    Promise.all([fetchTemplates(), fetchRecipientLists()]).finally(() =>
      setLoading(false)
    );
  }, []);

  // API calls
  const fetchTemplates = async () => {
    try {
      setError("");
      const response = await axiosIstance.get<Template[]>("/manager/templates");
      // Ensure we're getting an array
      if (Array.isArray(response.data)) {
        setTemplates(response.data);
      } else {
        console.error("Received non-array data:", response.data);
        setTemplates([]);
        setError("Invalid data format received for templates");
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      setTemplates([]);
      setError("Failed to fetch templates");
    }
  };

  const fetchRecipientLists = async () => {
    try {
      setError("");
      const response = await axiosIstance.get<RecipientList[]>(
        "/manager/recipient-lists"
      );
      // Ensure we're getting an array
      if (Array.isArray(response.data)) {
        setRecipientLists(response.data);
      } else {
        console.error("Received non-array data:", response.data);
        setRecipientLists([]);
        setError("Invalid data format received for recipient lists");
      }
    } catch (error) {
      console.error("Error fetching recipient lists:", error);
      setRecipientLists([]);
      setError("Failed to fetch recipient lists");
    }
  };

  const createTemplate = async () => {
    try {
      setError("");
      await axiosIstance.post<Template>("/manager/templates", newTemplate);
      setNewTemplate({ name: "", subject: "", content: "" });
      await fetchTemplates();
    } catch (error) {
      console.error("Error creating template:", error);
      setError("Failed to create template");
    }
  };

  const createRecipientList = async () => {
    try {
      setError("");
      const recipients = newRecipientList.recipients
        .split("\n")
        .map((email) => email.trim())
        .filter((email) => email);

      await axiosIstance.post<RecipientList>("/manager/recipient-lists", {
        name: newRecipientList.name,
        recipients,
      });
      setNewRecipientList({ name: "", recipients: "" });
      await fetchRecipientLists();
    } catch (error) {
      console.error("Error creating recipient list:", error);
      setError("Failed to create recipient list");
    }
  };

  const sendBulkEmails = async () => {
    try {
      setError("");
      setSendingStatus("Sending...");
      const template = templates.find((t) => t.id === selectedTemplate);
      const recipientList = recipientLists.find(
        (r) => r.id === selectedRecipientList
      );

      if (!template || !recipientList) {
        setSendingStatus("Please select both template and recipient list");
        return;
      }

      const emailPayload: EmailPayload = {
        recipients: recipientList.recipients,
        subject: template.subject,
        html: template.content,
      };

      await axiosIstance.post("/emails/send", emailPayload);
      setSendingStatus("Emails queued successfully!");
    } catch (error) {
      console.error("Error sending emails:", error);
      setSendingStatus("Error sending emails");
      setError("Failed to send emails");
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Bulk Email Manager</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {/* Template Creation Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Template</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Template Name"
            className="w-full p-2 border rounded"
            value={newTemplate.name}
            onChange={(e) =>
              setNewTemplate({ ...newTemplate, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Email Subject"
            className="w-full p-2 border rounded"
            value={newTemplate.subject}
            onChange={(e) =>
              setNewTemplate({ ...newTemplate, subject: e.target.value })
            }
          />
          <textarea
            placeholder="HTML Content"
            className="w-full p-2 border rounded h-32"
            value={newTemplate.content}
            onChange={(e) =>
              setNewTemplate({ ...newTemplate, content: e.target.value })
            }
          />
          <button
            onClick={createTemplate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Template
          </button>
        </div>
      </section>

      {/* Recipient List Creation Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create Recipient List</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="List Name"
            className="w-full p-2 border rounded"
            value={newRecipientList.name}
            onChange={(e) =>
              setNewRecipientList({ ...newRecipientList, name: e.target.value })
            }
          />
          <textarea
            placeholder="Enter email addresses (one per line)"
            className="w-full p-2 border rounded h-32"
            value={newRecipientList.recipients}
            onChange={(e) =>
              setNewRecipientList({
                ...newRecipientList,
                recipients: e.target.value,
              })
            }
          />
          <button
            onClick={createRecipientList}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Recipient List
          </button>
        </div>
      </section>

      {/* Bulk Email Sending Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Send Bulk Emails</h2>
        <div className="space-y-4">
          <select
            className="w-full p-2 border rounded"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(Number(e.target.value))}
          >
            <option value={0}>Select Template</option>
            {Array.isArray(templates) &&
              templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
          </select>

          <select
            className="w-full p-2 border rounded"
            value={selectedRecipientList}
            onChange={(e) => setSelectedRecipientList(Number(e.target.value))}
          >
            <option value={0}>Select Recipient List</option>
            {Array.isArray(recipientLists) &&
              recipientLists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
          </select>

          <button
            onClick={sendBulkEmails}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={!selectedTemplate || !selectedRecipientList}
          >
            Send Emails
          </button>

          {sendingStatus && (
            <div className="mt-4 p-4 bg-gray-100 rounded">{sendingStatus}</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BulkEmailManager;
