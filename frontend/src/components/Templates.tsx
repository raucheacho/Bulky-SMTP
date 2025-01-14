import { useState, useEffect } from "react";
import axios from "axios";

interface Template {
  id: number;
  name: string;
  subject: string;
  content: string;
}

interface NewTemplate {
  name: string;
  subject: string;
  content: string;
}

const Templates = (): JSX.Element => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [newTemplate, setNewTemplate] = useState<NewTemplate>({
    name: "",
    subject: "",
    content: "",
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async (): Promise<void> => {
    try {
      const response = await axios.get<Template[]>(
        "http://localhost:6000/api/templates"
      );
      setTemplates(response.data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const createTemplate = async (): Promise<void> => {
    try {
      await axios.post<Template>(
        "http://localhost:6000/api/templates",
        newTemplate
      );
      fetchTemplates();
    } catch (error) {
      console.error("Error creating template:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof NewTemplate
  ): void => {
    setNewTemplate({ ...newTemplate, [field]: e.target.value });
  };

  return (
    <div>
      <h1>Templates</h1>
      <input
        type="text"
        placeholder="Nom"
        value={newTemplate.name}
        onChange={(e) => handleInputChange(e, "name")}
      />
      <input
        type="text"
        placeholder="Sujet"
        value={newTemplate.subject}
        onChange={(e) => handleInputChange(e, "subject")}
      />
      <textarea
        placeholder="Contenu HTML"
        value={newTemplate.content}
        onChange={(e) => handleInputChange(e, "content")}
      />
      <button onClick={createTemplate}>Créer</button>
      <ul>
        {templates.map((template) => (
          <li key={template.id}>{template.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Templates;
