import React from 'react';
import { Button, Form, FormInstance } from 'antd';

interface SubmitButtonProps {
  form: FormInstance;
}

export default function SubmitButton({ form, children }: React.PropsWithChildren<SubmitButtonProps>) {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      // style={{ width: '100%' }}
    >
      {children}
    </Button>
  );
}
