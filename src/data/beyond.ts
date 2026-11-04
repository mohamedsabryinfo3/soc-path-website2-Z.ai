// ما بعد الكورسات: الخطوة التالية نحو SOC الفعلي + نصائح التوظيف + قاموس المصطلحات

export interface NextSkill {
  title: string;
  why: string;
  resources: string[];
  icon: string;
}

export const nextSkills: NextSkill[] = [
  {
    title: "أساسيات Linux",
    why: "أغلب سيرفرات SIEM والبنية التحتية تعمل على Linux؛ لن تستطيع التنقل في SOC بدون سطر أوامر لينكس",
    resources: ["Linux Journey (مجاني)", "OverTheWire Bandit (تمارين)", "Ubuntu + VirtualBox"],
    icon: "Terminal",
  },
  {
    title: "Wireshark وتحليل الحزم",
    why: "كل أساسيات OSI وEncapsulation وSPAN اللي درستها تتجمع هنا: تحليل PCAP مهارة يومية لمحلل الشبكة",
    resources: ["Wireshark الرسمي + ملفات SampleCaptures", "تمارين TryHackMe: Wireshark: The Basics"],
    icon: "FileSearch",
  },
  {
    title: "SIEM عمليًا (Splunk / Elastic)",
    why: "قلب شغل SOC: كتابة الاستعلامات وبناء التنبيهات — ابدأ بنسخة مجانية",
    resources: ["Splunk Free + بيانات Boss of the SOC", "Elastic Stack (ELK) على جهازك", "TryHackMe: Splunk Basics / ELK"],
    icon: "BarChart3",
  },
  {
    title: "الويندوز والـ Active Directory",
    why: "أغلب الشركات بيئتها Windows؛ سجلات Event Log والمصادقة هي مصدر أغلب التنبيهات",
    resources: ["TryHackMe: Windows Fundamentals 1-3", "Active Directory Basics"],
    icon: "MonitorSmartphone",
  },
  {
    title: "منصة TryHackMe — مسار SOC Level 1",
    why: "المسار الجاهز الأقرب لوظيفة SOC Analyst: يمزج النظري بالعملي ويعطيك شارات قابلة للإثبات",
    resources: ["TryHackMe: SOC Level 1 Path", "Cyber Defenders — Blue Team Labs", "LetsDefend"],
    icon: "Target",
  },
  {
    title: "أتمتة بلغة Python",
    why: "أتمتة التحليلات المتكررة ومعالجة السجلات الكبيرة: ميزة تنافسية حقيقية في التقديم",
    resources: ["Python for Everybody", "TryHackMe: Python Basics", "أتمتة تحليل PCAP وLogs"],
    icon: "Code",
  },
];

export interface CertStep {
  name: string;
  vendor: string;
  why: string;
  level: "بداية" | "متوسط" | "متقدم";
}

export const certs: CertStep[] = [
  { name: "CompTIA Security+", vendor: "CompTIA", why: "أشهر شهادة بداية للأمن السيبراني عالميًا وتغطي ما تعلمته نظريًا هنا بالإنجليزية", level: "بداية" },
  { name: "Splunk Core Certified User", vendor: "Splunk", why: "شهادة عملية مجانية تقريبًا تثبت قدرتك على التعامل مع SIEM حقيقي", level: "بداية" },
  { name: "CySA+ (Cybersecurity Analyst)", vendor: "CompTIA", why: "توسعة مباشرة لمهام SOC: التحليل والاستجابة — الهدف الطبيعي بعد Security+", level: "متوسط" },
  { name: "SSCP", vendor: "ISC2", why: "بديل قوي أثناء بناء الخبرة العملية", level: "متوسط" },
  { name: "SC-200 (Security Operations Analyst)", vendor: "Microsoft", why: "تخصص في Microsoft Sentinel: الطلب على Sentinel مرتفع في المنطقة", level: "متقدم" },
  { name: "GIAC GSEC / GSOC", vendor: "GIAC (SANS)", why: "أعلى مستوى وأغلى — يُدرس لما توفّر فرصة تدريب مؤسسية", level: "متقدم" },
];

export interface TipGroup {
  title: string;
  tips: string[];
  icon: string;
}

export const jobTips: TipGroup[] = [
  {
    title: "السيرة الذاتية CV",
    icon: "FileText",
    tips: [
      "ضع قسمًا باسم Home Lab يوضح ما بنته: GNS3، تحليل PCAP، SIEM محلي — المشاريع العملية تعوض قلة الخبرة",
      "اذكر مهارات الشبكات بوضوح: Subnetting وOSI وFirewall Rules — هذا ما يفرز أغلب المتقدمين",
      "استخدم كلمات وظائف SOC الحرفية: SIEM وTriage وLog Analysis وIncident Response — أنظمة الفرز (ATS) تبحث عنها",
      "وثّق شهادات TryHackMe والأدوات المجانية كروابط مباشرة في الـ CV",
    ],
  },
  {
    title: "أسئلة المقابلات الشائعة",
    icon: "MessageSquare",
    tips: [
      "اشرح الـ TCP Handshake الثلاثي — سؤال مفتاحي في كل مقابلة SOC تقريبًا",
      "ما الفرق بين الـ IDS وIPS؟ ومن أين يأخذ كل منهما الترافيك؟ (تلميح: SPAN!)",
      "لو ظهر تنبيه Brute Force على حساب إداري: ما خطوات الـ Triage بالترتيب؟",
      "ما الفرق بين False Positive وTrue Positive؟ وكيف تقلل الأول؟",
      "اشرح ماذا يفعل NAT وكيف يؤثر على ربط السجلات بين الشبكة الداخلية والخارجية",
      "ما هي مكونات الـ CIA Triad؟ وأعطِ مثالًا عمليًا لكل مكوّن",
    ],
  },
  {
    title: "بناء الملف العملي Home Lab",
    icon: "Wrench",
    tips: [
      "بيئة GNS3 جاهزة + سيناريو هجوم MAC Flooding مع تسجيل DHCP Snooping وهو يصد الهجوم",
      "Splunk Free يستقبل Syslog من أجهزة GNS3 ثم اكتب 3-5 استعلامات كشف بسيطة",
      "تحليل ملف PCAP لعملية Phishing واستخراج الـ IOC: دومين وIP وخوارزمية الاتصال",
      "اربط كل ما سبق في مقال على LinkedIn أو GitHub — هذا هو معرض أعمالك الفعلي",
    ],
  },
  {
    title: "الخطوة الأولى في التقديم",
    icon: "Send",
    tips: [
      "استهدف الوظائف: SOC Analyst Tier 1 وCybersecurity Analyst وSecurity Monitoring Analyst",
      "فعّل LinkedIn باحثًا (Open to Work) بكلمات مفتاحية عربية وإنجليزية",
      "راقب الشركات: البنوك والاتصالات وشركات MSSP توظف SOC بلا خبرة سابقة باستمرار",
      "في المقابلة اربط كل إجابة بدرس عملي فعلته — الخبرة العملية المحلية تُقاس",
    ],
  },
];

export interface GlossaryTerm {
  term: string;
  ar: string;
  desc: string;
}

export const glossary: GlossaryTerm[] = [
  { term: "SOC", ar: "مركز العمليات الأمنية", desc: "الفريق والمكان المسؤول عن مراقبة الأصول واكتشاف الهجمات والاستجابة لها على مدار الساعة" },
  { term: "SIEM", ar: "إدارة المعلومات والأحداث الأمنية", desc: "المنصة التي تجمع السجلات من كل الأجهزة وتربطها وتطلق التنبيهات — مثل Splunk وElastic وSentinel" },
  { term: "Triage", ar: "الفرز الأولي", desc: "أول فحص للتنبيه: حقيقي أم خطأ؟ وما خطورته؟ — العمل اليومي الأساسي لمحلل Tier 1" },
  { term: "Alert", ar: "تنبيه", desc: "إشعار يطلقه نظام الكشف عند تطابق سلوك مع قاعدة خبيثة" },
  { term: "Incident", ar: "حادث أمني", desc: "تنبيه أُثبت أنه حقيقي وضار ويستدعي الاستجابة الرسمية" },
  { term: "IOC", ar: "مؤشر اختراق", desc: "أثر فني قابل للقياس يثبت نشاطًا خبيثًا: IP أو دومين أو Hash لملف" },
  { term: "Log Source", ar: "مصدر السجلات", desc: "أي جهاز أو نظام ينتج سجلات: راوتر وسويتش وجدار ناري وويندوز — كل ما درسته في Syslog" },
  { term: "False Positive", ar: "إنذار كاذب", desc: "تنبيه أطلق لنشاط مشروع — نسبتها العالية تكلف الفريق وقتًا؛ تقليلها مهارة حقيقية" },
  { term: "Playbook", ar: "دليل الإجراءات", desc: "خطوات مكتوبة موحدة للتعامل مع نوع محدد من التنبيهات" },
  { term: "IDS / IPS", ar: "كشف / منع الاختراق", desc: "أداة تراقب الترافيك وتكشف (IDS) أو تصد (IPS) الهجمات — تتغذى من SPAN مباشرة" },
  { term: "EDR", ar: "كشف واستجابة نقاط النهاية", desc: "أداة أمنية على الأجهزة نفسها تراقب العمليات والسلوك — مثل CrowdStrike وDefender" },
  { term: "Threat Intelligence", ar: "استخبارات التهديدات", desc: "معلومات عن المهاجمين وأدواتهم ومؤشراتهم تستخدم لتحسين الكشف" },
  { term: "MITRE ATT&CK", ar: "إطار تكتيكات وتقنيات المهاجمين", desc: "قاعدة معرفية عالمية تصنف ما يفعله المهاجم خطوة بخطوة — لغة موحدة للتقارير" },
  { term: "Kill Chain", ar: "سلسلة القتل", desc: "مراحل الهجوم من الاستطلاع حتى تحقيق الهدف — تفهمها تعرف أين تقطع الهجوم" },
  { term: "C2 (Command & Control)", ar: "قيادة وتحكم", desc: "القناة التي يتواصل بها الاختراق مع المهاجم — تظهر غالبًا كـ DNS/HTTPS دوري مشبوه" },
  { term: "Lateral Movement", ar: "الحركة الجانبية", desc: "انتقال المهاجم من جهاز مخترق إلى أجهزة أخرى داخل الشبكة" },
  { term: "Exfiltration", ar: "استخراج البيانات", desc: "نقل البيانات المسروقة خارج المنظمة — مراقبته سبب اهتمامك بالأنفاق وDNS" },
  { term: "Privilege Escalation", ar: "رفع الصلاحيات", desc: "حصول المهاجم على صلاحيات أعلى مما أُعطي — لذلك درست AAA وPrivilege Levels" },
  { term: "Vulnerability", ar: "ثغرة", desc: "ضعف قابل للاستغلال في نظام أو تطبيق أو إعداد" },
  { term: "Patch Management", ar: "إدارة التحديثات", desc: "تطبيق التحديثات الأمنية بانتظام لإغلاق الثغرات المعروفة" },
  { term: "Zero Trust", ar: "انعدام الثقة", desc: "مبدأ: لا تثق بأحد داخل أو خارج الشبكة دون تحقق مستمر — ترجمته العملية AAA و802.1X" },
  { term: "MTTD / MTTR", ar: "متوسط زمن الاكتشاف / الاستجابة", desc: "مقاييس أداء أساسية لأي SOC: كم تستغرق لاكتشاف الحادث وكم لاحتوائه" },
  { term: "Packet Capture (PCAP)", ar: "التقاط الحزم", desc: "تسجيل الترافيك الخام للتحليل — التقنته عبر SPAN وقارأته عبر Wireshark" },
  { term: "Asset", ar: "أصل", desc: "أي شيء له قيمة ويحتاج حماية: جهاز وسيرفر وبيانات — تعرفه من جدول MAC وعناوين IP" },
];
