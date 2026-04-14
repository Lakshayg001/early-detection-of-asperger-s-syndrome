export const questionnaires = {
  toddler: {
    id: 'Q-CHAT-10',
    title: 'Q-CHAT-10 (Toddlers)',
    description: 'For children aged 18-36 months.',
    questions: [
      { id: 'q1', text: 'Does your child look at you when you call his/her name?' },
      { id: 'q2', text: 'How easy is it for you to get eye contact with your child?' },
      { id: 'q3', text: 'Does your child point to indicate that s/he wants something?' },
      { id: 'q4', text: 'Does your child point to share enjoyment with you?' },
      { id: 'q5', text: 'Does your child pretend? (e.g. care for a doll, talk on a toy phone)' },
      { id: 'q6', text: 'Does your child follow where you’re looking?' },
      { id: 'q7', text: 'Does your child try to comfort you if you’re upset?' },
      { id: 'q8', text: 'Can you describe your child’s first words?' },
      { id: 'q9', text: 'Does your child use simple gestures? (e.g. wave goodbye)' },
      { id: 'q10', text: 'Does your child stare at nothing with no apparent purpose?' }
    ]
  },
  child: {
    id: 'SRS-2-Short',
    title: 'Social Responsiveness Scale style (Children)',
    description: 'For children aged 3-17 years.',
    questions: [
      { id: 'c1', text: 'Takes things too literally; doesn’t get the "drift" of what’s being said.' },
      { id: 'c2', text: 'Avoids eye contact or has unusual eye contact.' },
      { id: 'c3', text: 'Seems to be "in his/her own world" or aloof.' },
      { id: 'c4', text: 'Has difficulty making friends even when trying his/her best.' },
      { id: 'c5', text: 'Focuses on details rather than the big picture.' },
      { id: 'c6', text: 'Has repetitive or odd body movements.' },
      { id: 'c7', text: 'Shows excessive interest in certain topics or objects.' },
      { id: 'c8', text: 'Difficulty understanding other people’s feelings.' }
    ]
  },
  adult: {
    id: 'AQ-10',
    title: 'AQ-10 + RAADS-R (Adults)',
    description: 'For individuals aged 18+.',
    questions: [
      { id: 'a1', text: 'I often notice small sounds when others do not.' },
      { id: 'a2', text: 'I usually concentrate more on the whole picture, rather than the small details.' },
      { id: 'a3', text: 'I find it easy to "read between the lines" when someone is talking to me.' },
      { id: 'a4', text: 'I find it easy to do more than one thing at once.' },
      { id: 'a5', text: 'I know how to tell if someone listening to me is getting bored.' },
      { id: 'a6', text: 'I find it difficult to work out people’s intentions.' },
      { id: 'a7', text: 'I like to collect information about categories of things.' },
      { id: 'a8', text: 'I find it easy to work out what someone is thinking or feeling.' }
    ]
  }
};
