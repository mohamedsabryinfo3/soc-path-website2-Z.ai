import type { Comparison } from "./types";

// المقارنات: تحليل على مستوى المحتوى — لكل موضوع تتكرر نسخه نختار الأقوى شرحًا
// ونضيف درسًا ثانيًا فقط إن كان مكملًا غير مكرر
export const comparisons: Comparison[] = [
  {
    topic: "نموذج OSI وبنية الحزم",
    options: [
      { pl: "abeer301", n: "3", verdict: "winner", note: "الأحدث تنظيمًا ومترابط مع درس Encapsulation الفريد في نفس القائمة" },
      { pl: "abeer301", n: "4", verdict: "complement", note: "درس الترويسات والتغليف غير متوفر عند غيره — يقدم جزءًا أصيلًا" },
      { pl: "nazmy125", n: "5", verdict: "excluded", note: "شرح ممتاز لكن مكرر بلا إضافة جوهرية بعد نسخة عبير" },
      { pl: "nazmy301", n: "11", verdict: "complement", note: "يُضاف لمقارنة TCP/UDP والنموذجين — جزء مكمل لا يقدمه أحد" },
      { pl: "abeer125", n: "2", verdict: "excluded", note: "نسخة أقدم من نفس شرح عبير" },
    ],
    decision: "الأساس من عبير 200-301 (3 + 4) والمكمل الوحيد مقارنة نظمي 301 رقم 11 — لا تكرار آخر يُقبل",
  },
  {
    topic: "العنونة والتقطيع Subnetting / VLSM",
    options: [
      { pl: "abeer301", n: "8", verdict: "winner", note: "مسار متسلسل حديث: IPv4 ثم Subnetting ثم VLSM في ثلاث دروس متكاملة" },
      { pl: "nazmy301", n: "5", verdict: "complement", note: "سلسلة VLSM المنهجية (5-8) تُفتح فقط إن لم تكتمل الصورة مع عبير" },
      { pl: "nazmy125", n: "2", verdict: "excluded", note: "نسخة 200-125 قديمة؛ سلسلة نظمي 301 تغطي نفس المحتوى محدثة" },
      { pl: "abeer125", n: "7", verdict: "excluded", note: "مكرر بلا إضافة بعد نسخة 200-301" },
    ],
    decision: "عبير 200-301 أساسًا، ونظمي 301 (VLSM 1-4) مرجع ثانٍ مشروع عند الحاجة فقط — وهذا استثناء تكرار مقبول لأنه شرح بطريقة مختلفة جذريًا",
  },
  {
    topic: "VLAN وTrunking",
    options: [
      { pl: "abeer301", n: "42", verdict: "winner", note: "أحدث شرح ومترابط مع درس هجوم VLAN Hopping في نفس القائمة" },
      { pl: "abeer301", n: "43", verdict: "complement", note: "Trunking وDot1Q جزء مكمل ضروري — يفسّر ثغرة DTP" },
      { pl: "nazmy125", n: "13", verdict: "excluded", note: "شرح جيد لكن نسخة أقدم" },
      { pl: "nazmy301", n: "13", verdict: "excluded", note: "ضمن سلسلة Switching المرجعية — يُفتح عند الحاجة لشرح ثاني فقط" },
    ],
    decision: "سلسلة عبير 200-301 (42-44) متكاملة وتنتهي بهجوم فعلي — الأفضل على الإطلاق",
  },
  {
    topic: "بروتوكول STP",
    options: [
      { pl: "abeer301", n: "45", verdict: "winner", note: "المفهوم العام في درس واحد — كافٍ عمدًا لبداية SOC" },
      { pl: "nazmy125", n: "10", verdict: "complement", note: "شرح نظمي الأعمق — يُفتح فقط إن لم تستوعب المفهوم" },
      { pl: "nazmy125", n: "11", verdict: "excluded", note: "تجميعة متقدمة (Port States/DTP/Rapid) تتجاوز حاجة البداية" },
      { pl: "abeerEncor", n: "13", verdict: "excluded", note: "حمايات BPDU أمنية حقيقية لكنها تعمق CCNP — تؤجل" },
    ],
    decision: "مفهوم عام فقط في بداية المسار، ونظمي 200-125 مرجع التعمق الوحيد المعتمد",
  },
  {
    topic: "أمن الشبكة المحلية: الهجمات والحمايات",
    options: [
      { pl: "abeer301", n: "52", verdict: "winner", note: "سلسلة (52-54) الوحيدة التي تقدم الهجمات ثلاثية متكاملة: MAC Flood + DHCP Snooping ثم DAI ثم Port Security" },
      { pl: "abeer301", n: "53", verdict: "complement", note: "DAI استكمال إلزامي للسلسلة" },
      { pl: "abeer301", n: "54", verdict: "complement", note: "Port Security استكمال إلزامي" },
      { pl: "nazmy125", n: "17", verdict: "complement", note: "شرح نظمي على جزأين (17-18) يضاف فقط للتعمق في Port Security" },
      { pl: "nazmy125", n: "41", verdict: "complement", note: "درس DHCP Snooping المستقل — إضافة عمق لا تكرار" },
      { pl: "abeer125", n: "41", verdict: "excluded", note: "نسخة أقدم وأقل شمولًا من سلسلة 200-301" },
    ],
    decision: "سلسلة عبير الأمنية هي الفائز بوضوح: ثلاثة دروس تطبيقية متصلة، مع شرحي نظمي (17-18 و41) كمكملات تعمق اختيارية",
  },
  {
    topic: "بروتوكول DHCP",
    options: [
      { pl: "nazmy301", n: "34", verdict: "winner", note: "سلسلة ثلاثية أعمق من أي درس منفرد: آلية الإيجار مفسرة بالتفصيل" },
      { pl: "abeer301", n: "33", verdict: "excluded", note: "درس جيد في جزء واحد لكنه أضيق من سلسلة نظمي" },
      { pl: "nazmy125", n: "40", verdict: "excluded", note: "نسخة 200-125 القديمة من نفس شرح نظمي" },
    ],
    decision: "نظمي 200-301 (DHCP 1-3) بلا منافس — الاختيار الوحيد المنطقي",
  },
  {
    topic: "قوائم التحكم ACL وترجمة NAT",
    options: [
      { pl: "nazmy301", n: "37", verdict: "winner", note: "الشرح التطبيقي المتدرج الأقوى — يبني منطق الفلترة خطوة خطوة" },
      { pl: "nazmy301", n: "38", verdict: "winner", note: "أشهر شرح NAT بالعربي: تطبيقي يفسّر سجلات الترجمة" },
      { pl: "abeer301", n: "34", verdict: "complement", note: "مرجع ثانٍ صالح — صياغة مختلفة للمراجعة" },
      { pl: "abeer301", n: "36", verdict: "excluded", note: "مكرر بعد شرح نظمي بلا إضافة تُذكر" },
      { pl: "nazmy125", n: "46", verdict: "excluded", note: "الـ ACL المتقدم يُفتح بعد إتقان الأساس فقط" },
    ],
    decision: "نظمي 301 أساسًا للموضوعين معًا؛ نسخة عبير ACL مرجع ثانٍ مقبول فقط",
  },
  {
    topic: "المصادقة AAA و802.1X",
    options: [
      { pl: "abeer301", n: "64", verdict: "winner", note: "أحدث صياغة بحلول حديثة بدل ACS المتقادم" },
      { pl: "abeer301", n: "65", verdict: "complement", note: "802.1X استكمال مباشر لمفهوم AAA" },
      { pl: "nazmy125", n: "58", verdict: "excluded", note: "يضيف Privilege Levels فقط — مرجع ثانٍ عند الحاجة" },
      { pl: "abeer125", n: "55", verdict: "excluded", note: "مبني على ACS القديم" },
    ],
    decision: "عبير 200-301 (64-65) أساسًا — نسخة نظمي مرجع إضافي اختياري",
  },
  {
    topic: "أنفاق VPN وGRE وIPsec",
    options: [
      { pl: "abeer301", n: "71", verdict: "winner", note: "سلسلة متكاملة: مفاهيم ثم GRE ثم IPsec عمليًا" },
      { pl: "abeer301", n: "72", verdict: "complement", note: "GRE جزء لا يتجزأ من السلسلة" },
      { pl: "abeer301", n: "73", verdict: "complement", note: "IPsec عمليًا — إضافة جوهرية غير موجودة عند نظمي" },
      { pl: "nazmy125", n: "52", verdict: "excluded", note: "شرح GRE ممتاز لكنه بلا IPsec — يخسر الميزة الحاسمة" },
      { pl: "nazmy125", n: "53", verdict: "excluded", note: "DMVPN تقدم في توقيت المسار" },
    ],
    decision: "سلسلة عبير (71-73) تنافس وتفوز لأنها الوحيدة التي تصل بيك لـ IPsec عمليًا",
  },
  {
    topic: "أدوات المراقبة: Syslog وNTP وSNMP",
    options: [
      { pl: "abeer301", n: "76", verdict: "winner", note: "سلسلة مراقبة متسلسلة (76-78): Syslog ثم SNMP ثم NTP بأسلوب موحد" },
      { pl: "abeer301", n: "78", verdict: "complement", note: "NTP جزء إلزامي من السلسلة" },
      { pl: "abeer301", n: "77", verdict: "complement", note: "SNMP جزء من نفس السلسلة" },
      { pl: "nazmy125", n: "65", verdict: "excluded", note: "شرح المستويات (Severities) عند نظمي ممتاز — مرجع ثانٍ فقط" },
      { pl: "nazmy125", n: "60", verdict: "excluded", note: "بديل مقبول لكن الاتساق مع السلسلة أهم" },
    ],
    decision: "سلسلة عبير للاتساق والحداثة، وشرح نظمي للـ Syslog مرجع التعمق المعتمد",
  },
  {
    topic: "التقاط الترافيك SPAN / RSPAN",
    options: [
      { pl: "nazmy125", n: "63", verdict: "winner", note: "الوحيد الذي يغطي SPAN وRSPAN معًا — قيمة إضافية حقيقية" },
      { pl: "abeer125", n: "77", verdict: "excluded", note: "يغطي SPAN فقط — تغطيته أضيق" },
    ],
    decision: "نظمي 200-125 درس 63 بلا منافسة: أهم مهارة تمهيدية مباشرة لمهام SOC",
  },
  {
    topic: "DNS",
    options: [
      { pl: "nazmy125", n: "44", verdict: "winner", note: "الوحيد الذي يقدم DNS كدرس مستقل في القوائم الخمس كلها" },
    ],
    decision: "لا منافسة أصلاً: درس نظمي 200-125 رقم 44 هو المصدر الوحيد المتاح ويصنف مهمًا جدًا لمسار SOC",
  },
  {
    topic: "الواي فاي",
    options: [
      { pl: "abeer301", n: "66", verdict: "winner", note: "أساسيات مرتبة يكملها درس Wi-Fi أساسيات فقط للمسار" },
      { pl: "nazmy301", n: "43", verdict: "excluded", note: "بديل مقبول؛ جزء Wireless 2 تعمق متأجل" },
    ],
    decision: "عبير 200-301 رقم 66 للمسار — نظمي بديل عند الحاجة",
  },
];
