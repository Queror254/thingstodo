import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface TaskDescriptionProps {
  description: string;
}

const TaskDescription: React.FC<TaskDescriptionProps> = ({ description }) => {
  // check if description is html
  const isHtml = description.includes("<");
  const desc = isHtml ? description.replace(/<[^>]*>?/g, "") : description;

  return (
    <div
      className="task-description text-start text-slate-700"
      style={{ fontSize: "14px", lineHeight: 1.8 }}
    >
      <ReactMarkdown
        children={desc}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      />
    </div>
  );
};

export default TaskDescription;
