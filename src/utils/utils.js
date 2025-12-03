export function convertToPersianNumber(num) {
  return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
}

export const getDiscountPercent = (product) => {
  if (product.offPrice === 0) return 0;
  const percent =
    product.offPrice &&
    Math.ceil(((product.price - product.offPrice) / product.price) * 100);

  return percent;
};

const colorHexMap = {
  Black: "#000000",
  White: "#FFFFFF",
  Red: "#FF0000",
  Blue: "#0000FF",
  Green: "#008000",
  Yellow: "#FFFF00",
  Orange: "#FFA500",
  Purple: "#800080",
  Pink: "#FFC0CB",
  Brown: "#A52A2A",
  Gray: "#808080",
  Silver: "#C0C0C0",
  Gold: "#FFD700",
  Beige: "#F5F5DC",
  NavyBlue: "#000080",
  Cyan: "#00FFFF",
  Magenta: "#FF00FF",
  Olive: "#808000",
  Teal: "#008080",
  Maroon: "#800000",
};

export function getHexColor(color) {
  return colorHexMap[color] || null; // یا undefined
}

const colorFarsiMap = {
  Black: "مشکی",
  White: "سفید",
  Red: "قرمز",
  Blue: "آبی",
  Green: "سبز",
  Yellow: "زرد",
  Orange: "نارنجی",
  Purple: "بنفش",
  Pink: "صورتی",
  Brown: "قهوه‌ای",
  Gray: "خاکستری",
  Silver: "نقره‌ای",
  Gold: "طلایی",
  Beige: "بژ",
  NavyBlue: "آبی تیره",
  Cyan: "فیروزه‌ای",
  Magenta: "ارغوانی",
  Olive: "زیتونی",
  Teal: "آبی سبز",
  Maroon: "زرشکی",
};

export function getFarsiColor(color) {
  return colorFarsiMap[color] || null; // اگر رنگ پیدا نشد null برمی‌گردونه
}
