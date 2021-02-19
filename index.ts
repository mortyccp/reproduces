import { Step } from 'prosemirror-transform'
import { EditorState } from 'prosemirror-state'
import { Schema } from 'prosemirror-model'

const spec = {
  nodes: {
    doc: { content: 'block*' },
    text: { group: 'inline', selectable: false },
    headline: {
      group: 'block',
      content: 'text*',
      selectable: false,
      marks: 'hidden_text',
      parseDOM: [{ tag: 'h1.Headline' }],
    },
    social_headline: {
      group: 'block',
      content: 'text*',
      selectable: false,
      marks: 'hidden_text',
      parseDOM: [{ tag: 'h2.SocialHeadline' }],
    },
    subheading: {
      group: 'block',
      content: 'subheading_item+',
      selectable: false,
      marks: 'hidden_text',
      parseDOM: [{ tag: 'ul.Subheading' }],
    },
    subheading_text: {
      group: 'block',
      content: 'inline*',
      selectable: false,
      marks: 'hidden_text',
      parseDOM: [{ tag: 'h3.SubheadingText' }],
    },
    subheading_item: {
      content: 'text*',
      selectable: false,
      marks: 'hidden_text',
      parseDOM: [{ tag: 'li.SubheadingItem' }],
    },
    summary: {
      group: 'block',
      content: 'text*',
      selectable: false,
      marks: 'hidden_text',
      parseDOM: [{ tag: 'h3.Summary' }],
    },
    paragraph: {
      group: 'body_group',
      content: 'inline*',
      selectable: false,
      parseDOM: [{ tag: 'p' }],
    },
    blockquote: {
      group: 'body_group',
      content: 'quote source',
      selectable: true,
      parseDOM: [{ tag: 'blockquote' }],
    },
    quote: {
      content: 'text*',
      selectable: false,
      marks: '',
      parseDOM: [{ tag: 'div[node-type="quote"]' }],
    },
    source: {
      content: 'text*',
      selectable: false,
      marks: '',
      parseDOM: [{ tag: 'div[node-type="source"]' }],
    },
    iframe: {
      group: 'body_group',
      selectable: true,
      attrs: {
        src: { default: '' },
        width: { default: '560' },
        height: { default: '315' },
        frameborder: { default: 1 },
        allowfullscreen: { default: 'true' },
      },
      parseDOM: [{ tag: 'iframe[src]' }],
    },
    image_inline: {
      group: 'body_group',
      content: 'image_inline_file image_inline_caption',
      selectable: true,
      parseDOM: [{ tag: 'image_inline' }],
    },
    image_inline_caption: {
      content: 'text*',
      selectable: false,
      marks: '',
      parseDOM: [{ tag: 'image_inline_caption' }],
    },
    image_inline_file: {
      attrs: { src: { default: null }, cropSizes: { default: [] } },
      selectable: false,
      parseDOM: [{ tag: 'image_inline_file' }],
    },
    numbered_list: {
      group: 'body_group',
      content: 'list_item+',
      selectable: false,
      parseDOM: [{ tag: 'ol' }],
    },
    bulleted_list: {
      group: 'body_group',
      content: 'list_item+',
      selectable: false,
      parseDOM: [{ tag: 'ul' }],
    },
    list_item: {
      content: 'paragraph+',
      selectable: false,
      defining: true,
      parseDOM: [{ tag: 'li' }],
    },
    body: {
      group: 'block',
      content: 'body_group+',
      selectable: false,
      parseDOM: [{ tag: 'div.Body' }],
    },
    hard_break: {
      group: 'inline',
      inline: true,
      selectable: false,
      parseDOM: [{ tag: 'br' }],
    },
    photo_gallery: {
      group: 'block',
      content: 'photo_gallery_item*',
      selectable: false,
      parseDOM: [{ tag: 'photo_gallery' }],
    },
    photo_gallery_item: {
      content: 'photo_gallery_file photo_gallery_caption',
      selectable: false,
      draggable: true,
      parseDOM: [{ tag: 'photo_gallery_item' }],
    },
    photo_gallery_file: {
      attrs: { src: { default: null }, cropSizes: { default: [] } },
      selectable: false,
      parseDOM: [{ tag: 'photo_gallery_file' }],
    },
    photo_gallery_caption: {
      content: 'text*',
      selectable: false,
      marks: '',
      parseDOM: [{ tag: 'photo_gallery_caption' }],
    },
    code_block: {
      group: 'body_group',
      content: 'text*',
      selectable: true,
      marks: '',
      atom: true,
      code: true,
      defining: true,
      parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' as const }],
    },
    heading: {
      attrs: { level: { default: 1 } },
      group: 'body_group',
      content: 'inline*',
      selectable: false,
      defining: true,
      parseDOM: [
        { tag: 'h1', attrs: { level: 1 } },
        { tag: 'h2', attrs: { level: 2 } },
        { tag: 'h3', attrs: { level: 3 } },
        { tag: 'h4', attrs: { level: 4 } },
        { tag: 'h5', attrs: { level: 5 } },
        { tag: 'h6', attrs: { level: 6 } },
      ],
    },
    oembed: {
      attrs: {
        src: { default: null },
        width: { default: null },
        height: { default: null },
      },
      group: 'body_group',
      selectable: true,
      parseDOM: [{ tag: 'div.Oembed' }],
    },
    unidentified: {
      group: 'body_group',
      attrs: { content: { default: null } },
      selectable: true,
      parseDOM: [{ tag: 'div.Unidentified' }],
    },
  },
  marks: {
    hidden_text: { attrs: { active: { default: true } }, parseDOM: [{}] },
    strong: {
      parseDOM: [{ tag: 'strong' }, { tag: 'b' }, { style: 'font-weight' }],
    },
    em: {
      parseDOM: [{ tag: 'em' }, { tag: 'i' }, { style: 'font-style=italic' }],
    },
    underline: {
      parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
    },
    note: {
      attrs: { note: { default: null } },
      inclusive: false,
      parseDOM: [{}],
    },
    link: {
      attrs: {
        href: {},
        title: { default: null },
        target: { default: '_self' },
      },
      inclusive: false,
      parseDOM: [{ tag: 'a[href]' }],
    },
    shouting: { parseDOM: [{ tag: 'shouting' }] },
  },
}

const schema = new Schema(spec)

const steps: Step[] = [
  {
    stepType: 'replace',
    from: 0,
    to: 0,
    slice: {
      content: [
        { type: 'headline' },
        { type: 'social_headline' },
        { type: 'subheading', content: [{ type: 'subheading_item' }] },
        { type: 'summary' },
        { type: 'body', content: [{ type: 'paragraph' }] },
      ],
    },
  },
  {
    stepType: 'replace',
    from: 12,
    to: 12,
    slice: { content: [{ type: 'text', text: 'The ' }] },
  },
  {
    stepType: 'replace',
    from: 15,
    to: 16,
    slice: { content: [{ type: 'text', text: ' Min ' }] },
  },
  {
    stepType: 'replace',
    from: 19,
    to: 20,
    slice: { content: [{ type: 'text', text: ' Chiu ' }] },
  },
  {
    stepType: 'replace',
    from: 24,
    to: 25,
    slice: { content: [{ type: 'text', text: ' Society’s ' }] },
  },
  {
    stepType: 'replace',
    from: 34,
    to: 35,
    slice: { content: [{ type: 'text', text: ' 60th ' }] },
  },
  {
    stepType: 'replace',
    from: 39,
    to: 40,
    slice: { content: [{ type: 'text', text: ' annicev' }] },
  },
  {
    stepType: 'replace',
    from: 44,
    to: 47,
    slice: { content: [{ type: 'text', text: 'verary ' }] },
  },
  {
    stepType: 'replace',
    from: 50,
    to: 51,
    slice: { content: [{ type: 'text', text: ' exhibition ' }] },
  },
  {
    stepType: 'replace',
    from: 47,
    to: 47,
    slice: { content: [{ type: 'text', text: 's' }] },
  },
  {
    stepType: 'replace',
    from: 62,
    to: 63,
    slice: { content: [{ type: 'text', text: ' has ' }] },
  },
  {
    stepType: 'replace',
    from: 66,
    to: 67,
    slice: { content: [{ type: 'text', text: ' finally ' }] },
  },
  {
    stepType: 'replace',
    from: 74,
    to: 75,
    slice: { content: [{ type: 'text', text: ' opened ' }] },
  },
  {
    stepType: 'replace',
    from: 81,
    to: 82,
    slice: { content: [{ type: 'text', text: ' to ' }] },
  },
  {
    stepType: 'replace',
    from: 84,
    to: 85,
    slice: { content: [{ type: 'text', text: ' the ' }] },
  },
  {
    stepType: 'replace',
    from: 88,
    to: 89,
    slice: { content: [{ type: 'text', text: ' public, ' }] },
  },
  {
    stepType: 'replace',
    from: 96,
    to: 97,
    slice: { content: [{ type: 'text', text: ' after ' }] },
  },
  {
    stepType: 'replace',
    from: 12,
    to: 12,
    slice: { content: [{ type: 'text', text: 'Turning 60 is a major lan' }] },
  },
  { stepType: 'replace', from: 34, to: 37 },
  {
    stepType: 'replace',
    from: 34,
    to: 34,
    slice: { content: [{ type: 'text', text: 'landmark ' }] },
  },
  {
    stepType: 'replace',
    from: 43,
    to: 43,
    slice: { content: [{ type: 'text', text: 'in many Asian cultures. ' }] },
  },
  {
    stepType: 'replace',
    from: 12,
    to: 20,
    slice: { content: [{ type: 'text', text: 'Sixty' }] },
  },
  {
    stepType: 'replace',
    from: 12,
    to: 17,
    slice: { content: [{ type: 'text', text: 'Sixty is a major birthday ' }] },
  },
  { stepType: 'replace', from: 38, to: 61 },
  { stepType: 'replace', from: 60, to: 61 },
  {
    stepType: 'replace',
    from: 60,
    to: 60,
    slice: { content: [{ type: 'text', text: ', ' }] },
  },
  {
    stepType: 'replace',
    from: 61,
    to: 62,
    slice: { content: [{ type: 'text', text: ' a ' }] },
  },
  {
    stepType: 'replace',
    from: 63,
    to: 64,
    slice: { content: [{ type: 'text', text: ' threshold ' }] },
  },
  {
    stepType: 'replace',
    from: 73,
    to: 74,
    slice: { content: [{ type: 'text', text: ' marking ' }] },
  },
  {
    stepType: 'replace',
    from: 83,
    to: 83,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  {
    stepType: 'replace',
    from: 81,
    to: 84,
    slice: { content: [{ type: 'text', text: ' m  ' }] },
  },
  {
    stepType: 'replace',
    from: 83,
    to: 83,
    slice: { content: [{ type: 'text', text: 'aturity' }] },
  },
  {
    stepType: 'replace',
    from: 92,
    to: 92,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  {
    stepType: 'replace',
    from: 90,
    to: 93,
    slice: { content: [{ type: 'text', text: ' a  ' }] },
  },
  {
    stepType: 'replace',
    from: 92,
    to: 92,
    slice: { content: [{ type: 'text', text: 'nd' }] },
  },
  {
    stepType: 'replace',
    from: 96,
    to: 96,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  {
    stepType: 'replace',
    from: 73,
    to: 97,
    slice: { content: [{ type: 'text', text: '    ' }] },
  },
  {
    stepType: 'replace',
    from: 73,
    to: 77,
    slice: { content: [{ type: 'text', text: ' o   ' }] },
  },
  {
    stepType: 'replace',
    from: 75,
    to: 75,
    slice: { content: [{ type: 'text', text: 'f' }] },
  },
  {
    stepType: 'replace',
    from: 79,
    to: 79,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  {
    stepType: 'replace',
    from: 76,
    to: 80,
    slice: { content: [{ type: 'text', text: ' m   ' }] },
  },
  {
    stepType: 'replace',
    from: 78,
    to: 78,
    slice: { content: [{ type: 'text', text: 'aturity' }] },
  },
  { stepType: 'replace', from: 78, to: 85 },
  {
    stepType: 'replace',
    from: 76,
    to: 81,
    slice: { content: [{ type: 'text', text: '    ' }] },
  },
  { stepType: 'replace', from: 79, to: 80 },
  { stepType: 'replace', from: 75, to: 76 },
  {
    stepType: 'replace',
    from: 73,
    to: 78,
    slice: { content: [{ type: 'text', text: '    ' }] },
  },
  {
    stepType: 'replace',
    from: 73,
    to: 77,
    slice: { content: [{ type: 'text', text: ' m   ' }] },
  },
  {
    stepType: 'replace',
    from: 75,
    to: 75,
    slice: { content: [{ type: 'text', text: 'arking' }] },
  },
  {
    stepType: 'replace',
    from: 84,
    to: 84,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  {
    stepType: 'replace',
    from: 81,
    to: 85,
    slice: { content: [{ type: 'text', text: ' m   ' }] },
  },
  {
    stepType: 'replace',
    from: 83,
    to: 83,
    slice: { content: [{ type: 'text', text: 'ature' }] },
  },
  {
    stepType: 'replace',
    from: 87,
    to: 88,
    slice: { content: [{ type: 'text', text: 'ity' }] },
  },
  {
    stepType: 'replace',
    from: 93,
    to: 93,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  { stepType: 'replace', from: 64, to: 74 },
  {
    stepType: 'replace',
    from: 60,
    to: 60,
    slice: {
      content: [{ type: 'paragraph' }, { type: 'paragraph' }],
      openStart: 1,
      openEnd: 1,
    },
    structure: true,
  },
  {
    stepType: 'replace',
    from: 60,
    to: 60,
    slice: { content: [{ type: 'text', text: ', ' }] },
  },
  {
    stepType: 'replace',
    from: 61,
    to: 62,
    slice: { content: [{ type: 'text', text: ' and ' }] },
  },
  {
    stepType: 'replace',
    from: 65,
    to: 66,
    slice: { content: [{ type: 'text', text: ' so, ' }] },
  },
  {
    stepType: 'replace',
    from: 65,
    to: 70,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  {
    stepType: 'replace',
    from: 61,
    to: 66,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  { stepType: 'replace', from: 60, to: 62 },
  {
    stepType: 'replace',
    from: 60,
    to: 60,
    slice: { content: [{ type: 'text', text: ', ' }] },
  },
  {
    stepType: 'replace',
    from: 61,
    to: 62,
    slice: { content: [{ type: 'text', text: ' and ' }] },
  },
  {
    stepType: 'replace',
    from: 65,
    to: 66,
    slice: { content: [{ type: 'text', text: ' so, ' }] },
  },
  {
    stepType: 'replace',
    from: 69,
    to: 70,
    slice: { content: [{ type: 'text', text: ' for ' }] },
  },
  {
    stepType: 'replace',
    from: 73,
    to: 74,
    slice: { content: [{ type: 'text', text: ' a ' }] },
  },
  {
    stepType: 'replace',
    from: 75,
    to: 76,
    slice: { content: [{ type: 'text', text: ' private ' }] },
  },
  {
    stepType: 'replace',
    from: 75,
    to: 84,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  {
    stepType: 'replace',
    from: 73,
    to: 76,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  {
    stepType: 'replace',
    from: 73,
    to: 74,
    slice: { content: [{ type: 'text', text: ' Hong ' }] },
  },
  {
    stepType: 'replace',
    from: 78,
    to: 79,
    slice: { content: [{ type: 'text', text: ' Kong’ ' }] },
  },
  {
    stepType: 'replace',
    from: 84,
    to: 85,
    slice: { content: [{ type: 'text', text: ' top' }] },
  },
  {
    stepType: 'replace',
    from: 84,
    to: 88,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  {
    stepType: 'replace',
    from: 84,
    to: 85,
    slice: { content: [{ type: 'text', text: 's ' }] },
  },
  {
    stepType: 'replace',
    from: 85,
    to: 86,
    slice: { content: [{ type: 'text', text: ' top ' }] },
  },
  {
    stepType: 'replace',
    from: 89,
    to: 90,
    slice: { content: [{ type: 'text', text: ' collec' }] },
  },
  {
    stepType: 'replace',
    from: 89,
    to: 96,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  {
    stepType: 'replace',
    from: 85,
    to: 90,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  {
    stepType: 'replace',
    from: 85,
    to: 86,
    slice: { content: [{ type: 'text', text: ' elite ' }] },
  },
  {
    stepType: 'replace',
    from: 91,
    to: 91,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  {
    stepType: 'replace',
    from: 91,
    to: 92,
    slice: { content: [{ type: 'text', text: ' society ' }] },
  },
  {
    stepType: 'replace',
    from: 91,
    to: 100,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  { stepType: 'replace', from: 91, to: 92 },
  {
    stepType: 'replace',
    from: 85,
    to: 85,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  {
    stepType: 'replace',
    from: 85,
    to: 86,
    slice: { content: [{ type: 'text', text: ' most' }] },
  },
  {
    stepType: 'replace',
    from: 96,
    to: 97,
    slice: { content: [{ type: 'text', text: ' clu ' }] },
  },
  {
    stepType: 'replace',
    from: 100,
    to: 101,
    slice: { content: [{ type: 'text', text: 'b ' }] },
  },
  {
    stepType: 'replace',
    from: 101,
    to: 102,
    slice: { content: [{ type: 'text', text: ' of ' }] },
  },
  {
    stepType: 'replace',
    from: 104,
    to: 105,
    slice: { content: [{ type: 'text', text: ' Chinee ' }] },
  },
  {
    stepType: 'replace',
    from: 110,
    to: 112,
    slice: { content: [{ type: 'text', text: 'ses ' }] },
  },
  {
    stepType: 'replace',
    from: 113,
    to: 114,
    slice: { content: [{ type: 'text', text: ' art ' }] },
  },
  {
    stepType: 'replace',
    from: 113,
    to: 118,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  {
    stepType: 'replace',
    from: 112,
    to: 114,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  {
    stepType: 'replace',
    from: 112,
    to: 113,
    slice: { content: [{ type: 'text', text: ' art ' }] },
  },
  {
    stepType: 'replace',
    from: 116,
    to: 117,
    slice: { content: [{ type: 'text', text: ' collectors' }] },
  },
  {
    stepType: 'replace',
    from: 127,
    to: 127,
    slice: { content: [{ type: 'text', text: ', ' }] },
  },
  {
    stepType: 'replace',
    from: 128,
    to: 129,
    slice: { content: [{ type: 'text', text: ' it ' }] },
  },
  {
    stepType: 'replace',
    from: 131,
    to: 132,
    slice: { content: [{ type: 'text', text: ' is ' }] },
  },
  {
    stepType: 'replace',
    from: 134,
    to: 135,
    slice: { content: [{ type: 'text', text: ' a ' }] },
  },
  {
    stepType: 'replace',
    from: 136,
    to: 137,
    slice: { content: [{ type: 'text', text: ' birthday ' }] },
  },
  {
    stepType: 'replace',
    from: 145,
    to: 146,
    slice: { content: [{ type: 'text', text: ' that ' }] },
  },
  {
    stepType: 'replace',
    from: 150,
    to: 151,
    slice: { content: [{ type: 'text', text: ' deserve ' }] },
  },
  {
    stepType: 'replace',
    from: 158,
    to: 159,
    slice: { content: [{ type: 'text', text: ' a ' }] },
  },
  {
    stepType: 'replace',
    from: 158,
    to: 161,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  {
    stepType: 'replace',
    from: 158,
    to: 159,
    slice: { content: [{ type: 'text', text: 's ' }] },
  },
  {
    stepType: 'replace',
    from: 159,
    to: 160,
    slice: { content: [{ type: 'text', text: ' a ' }] },
  },
  {
    stepType: 'replace',
    from: 159,
    to: 162,
    slice: { content: [{ type: 'text', text: ' ' }] },
  },
  { stepType: 'replace', from: 60, to: 61 },
  {
    stepType: 'replace',
    from: 69,
    to: 69,
    slice: { content: [{ type: 'text', text: 'the ' }] },
  },
  {
    stepType: 'replace',
    from: 73,
    to: 73,
    slice: { content: [{ type: 'text', text: 'birthday ' }] },
  },
  { stepType: 'replace', from: 73, to: 82 },
  {
    stepType: 'replace',
    from: 73,
    to: 73,
    slice: {
      content: [{ type: 'paragraph' }, { type: 'paragraph' }],
      openStart: 1,
      openEnd: 1,
    },
    structure: true,
  },
  {
    stepType: 'replace',
    from: 75,
    to: 75,
    slice: {
      content: [{ type: 'paragraph' }, { type: 'paragraph' }],
      openStart: 1,
      openEnd: 1,
    },
    structure: true,
  },
] as any

const newSteps = [
  {
    stepType: 'replace',
    from: 69,
    to: 70,
  },
  {
    stepType: 'replace',
    from: 69,
    to: 70,
  },
  {
    stepType: 'replace',
    from: 68,
    to: 71,
    slice: {
      content: [
        {
          type: 'text',
          text: ' ',
        },
      ],
    },
  },
  {
    stepType: 'replace',
    from: 69,
    to: 71,
    structure: true,
  },
  {
    stepType: 'replace',
    from: 69,
    to: 71,
    structure: true,
  },
]

steps
  .map((s) => Step.fromJSON(schema, s))
  .concat(mergeStep(newSteps.map((s) => Step.fromJSON(schema, s))))
  .reduce((prevDoc, step, index) => {
    const stepResult = step.apply(prevDoc)
    if (stepResult.failed || !stepResult.doc) {
      console.log('invalid step at', index, step)
      throw new Error('invalid')
    }
    return stepResult.doc
  }, EditorState.create({ schema }).doc)

function mergeStep(steps: Step[]) {
  const res = []
  let current = steps[0]
  for (let i = 1; i < steps.length; i++) {
    const newStep = current.merge(steps[i])
    if (newStep) {
      current = newStep
    } else {
      res.push(current)
      current = steps[i]
    }
  }
  res.push(current)
  return res
}
