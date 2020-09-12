export const STYLE_SCHEMA = {
  // S 宽高
  width: {
    title: 'Width',
    type: 'textaddon',
    addons: ['px', '%', 'vw', ''],
  },
  maxWidth: {
    title: 'maxWidth',
    type: 'textaddon',
    addons: ['px', '%', 'vw', ''],
  },
  height: {
    title: 'Height',
    type: 'textaddon',
    addons: ['px', '%', 'vh', ''],
  },
  maxHeight: {
    title: 'maxHeight',
    type: 'textaddon',
    addons: ['px', '%', 'vh', ''],
  },
  // E 宽高

  // S 外边距
  marginTop: {
    title: 'Margin Top',
    type: 'textaddon',
    addons: ['px', '%', 'vw', 'vh', ''],
  },
  marginRight: {
    title: 'Margin Right',
    type: 'textaddon',
    addons: ['px', '%', 'vw', 'vh', ''],
  },
  marginBottom: {
    title: 'Margin Bottom',
    type: 'textaddon',
    addons: ['px', '%', 'vw', 'vh', ''],
  },
  marginLeft: {
    title: 'Margin Left',
    type: 'textaddon',
    addons: ['px', '%', 'vw', 'vh', ''],
  },
  // E 外边距

  // S 内边距
  paddingTop: {
    title: 'Padding Top',
    type: 'textaddon',
    addons: ['px', '%', 'vw', 'vh', ''],
  },
  paddingRight: {
    title: 'Padding Right',
    type: 'textaddon',
    addons: ['px', '%', 'vw', 'vh', ''],
  },
  paddingBottom: {
    title: 'Padding Bottom',
    type: 'textaddon',
    addons: ['px', '%', 'vw', 'vh', ''],
  },
  paddingLeft: {
    title: 'Padding Left',
    type: 'textaddon',
    addons: ['px', '%', 'vw', 'vh', ''],
  },
  // E 内边距

  // S 字体
  fontFamily: {
    title: 'Font Family',
    type: 'select',
    options: [
      {
        label: '默认字体',
        value: '',
      },
    ],
  },
  fontWeight: {
    title: 'Font Weight',
    type: 'select',
    options: [
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      'bold',
      'bolder',
      'lighter',
      'normal',
    ],
  },
  fontSize: {
    title: 'Font Size',
    type: 'select',
    options: ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '48px', '56px'],
  },
  letterSpace: {
    title: 'Letter Spacing',
    type: 'text',
  },
  lineHeight: {
    title: 'Line Height',
    type: 'text',
  },
  textAlign: {
    title: 'Text Align',
    type: 'select',
    options: ['left', 'center', 'right'],
    optionType: 'button',
  },
  color: {
    title: 'Text Color',
    type: 'color',
  },
  // E 字体

  // S 边框
  borderWidth: {
    title: 'Border Width',
    type: 'textaddon',
    addons: ['px', '%', 'vw'],
  },
  borderStyle: {
    title: 'Border Style',
    type: 'select',
    options: [
      'dashed',
      'dotted',
      'double',
      'groove',
      'hidden',
      'inset',
      'outset',
      'ridge',
      'solid',
      'none',
    ],
  },
  borderColor: {
    title: 'Border Color',
    type: 'color',
  },
  // E 边框
};
