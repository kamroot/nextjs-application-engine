import * as React from 'react';
import Button from '~/lib/components/primitives/button';
import Link from 'next/link';

function Signup({ text = 'Error: No text provided' }) {
  return (
    <div className="my-4 bg-brand-neutral-200 py-8 text-center">
      <div className="py-2">Try HomeKasa today for free</div>
      <Button variant="primary">
        <Link href="https://app.homekasa.io">{text}</Link>
      </Button>
    </div>
  );
}

export default Signup;
