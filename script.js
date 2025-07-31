diff --git a/script.js b/script.js
index 5b665b65de756538a3b63fa90e60d6bd16b361a6..4e34fa3494f0ea28ee088e73b0e17c12faaffdb0 100644
--- a/script.js
+++ b/script.js
@@ -1,63 +1,91 @@
 let selectedClass = 0;
 let selectedTerm = 0;
-function toggleDarkMode() {
-    document.body.classList.toggle("dark-mode");
-}
+function toggleDarkMode() {
+    document.body.classList.toggle("dark-mode");
+    if (document.body.classList.contains("dark-mode")) {
+        localStorage.setItem("theme", "dark");
+    } else {
+        localStorage.removeItem("theme");
+    }
+}
+
+document.addEventListener("DOMContentLoaded", () => {
+    if (localStorage.getItem("theme") === "dark") {
+        document.body.classList.add("dark-mode");
+    }
+});
 function showClasses(cls) {
     selectedClass = cls;
     document.getElementById("mainPage").classList.add("hidden");
     document.getElementById("classPage").classList.remove("hidden");
     document.getElementById("classTitle").innerText = cls + ". Sınıf";
 }
 function showTerms(term) {
     selectedTerm = term;
     document.getElementById("classPage").classList.add("hidden");
     document.getElementById("termPage").classList.remove("hidden");
     document.getElementById("termTitle").innerText = selectedClass + ". Sınıf " + term + ". Dönem";
     generateCourseButtons();
 }
 function goBack(page) {
     document.querySelectorAll(".container").forEach(el => el.classList.add("hidden"));
     document.getElementById(page).classList.remove("hidden");
 }
-function generateCourseButtons() {
+function generateCourseButtons() {
     const courseButtons = document.getElementById("courseButtons");
     courseButtons.innerHTML = "";
 
     if (courses[selectedClass] && courses[selectedClass][selectedTerm]) {
         courses[selectedClass][selectedTerm].forEach(course => {
             let btn = document.createElement("button");
             btn.innerText = course;
             btn.onclick = function() { 
                 let url = driveLinks[course] || "https://drive.google.com";
                 window.open(url, "_blank"); 
             };
             courseButtons.appendChild(btn);
         });
     }
-}
+}
+
+function searchCourse() {
+    const query = document.getElementById("searchInput").value.toLowerCase();
+    const resultsDiv = document.getElementById("searchResults");
+    resultsDiv.innerHTML = "";
+    if (query.trim() === "") {
+        return;
+    }
+    Object.keys(driveLinks).forEach(course => {
+        if (course.toLowerCase().includes(query)) {
+            const btn = document.createElement("button");
+            btn.innerText = course;
+            btn.onclick = () => window.open(driveLinks[course], "_blank");
+            resultsDiv.appendChild(btn);
+        }
+    });
+}
 const courses = {
     1: { 1: ["FİZİK I"],
          2: ["MÜHENDİSLER İÇİN LİNEER CEBİR", "ELEKTRİK-ELEKTRONİK MÜHENDİSLİĞİNE GİRİŞ", "MATEMATİK-II"] },
     2: { 1: ["DEVRE ANALİZİ I", "ELEKTRONİK ELEMANLAR", "MÜHENDİSLİK MATEMATİĞİ I", "LOJİK DEVRELERE GİRİŞ", "MÜHENDİSLER İÇİN OLASILIK TEORİSİ VE İSTATİSTİK", "MÜHENDİSLİK İÇİN DİFERANSİYEL DENKLEMLER", "TEKNİK YABANCI DİL I", "ÖLÇME VE ANALİZ LABORATUARI"],
          2: ["DEVRE ANALİZİ II", "ELEKTRONİK DEVRELER I", "SAYISAL ÇÖZÜMLEME", "LOJİK DEVRE TASARIMI", "MÜHENDİSLİK MATEMATİĞİ II", "TEKNİK YABANCI DİL II", "ELEKTRONİK DEVRE LABORATUARI I", "LOJİK LABORATUARI"] },
     3: { 1: ["ELEKTRİK MAKİNALARI", "ELEKTRONİK DEVRELER II", "ELEKTRONİK DEVRE LABORATUARI II", "MİKROİŞLEMCİLER", "ELEKTROMAGNETİK ALANLAR TEORİSİ", "İŞARETLER VE SİSTEMLER", "BİLİM TEKNOLOJİ VE MÜHENDİSLİK","DİJİTAL ELEKTRONİK","ENDÜSTRİYEL ELEKTRONİK","AR-GE, İNOVASYON VE TEKNOLOJİ YÖNETİMİ","MİKRODENETLEYİCİLER","RF DEVRELERİNE GİRİŞ"],
          2: ["OTOMATİK KONTROL", "HABERLEŞME MÜHENDİSLİĞİNİN TEMELLERİ", "ELEKTROMAGNETİK DALGALAR TEORİSİ", "ELEKTRİK TESİSLERİ", "DİJİTAL ELEKTRONİK", "ENDÜSTRİYEL ELEKTRONİK", "AR-GE, İNOVASYON VE TEKNOLOJİ YÖNETİMİ", "MİKRODENETLEYİCİLER"] },
     4: { 1: ["HABERLEŞME LABORATUARI","ANTENLER", "HİBRİD VE ELEKTRİKLİ ARAÇ TEKNOLOJİSİ","TIP ELEKTRONİĞİ", "KONTROL LABORATUARI","NANOTEKNOLOJİNİN TEMELLERİ", "OPTİK HABERLEŞME","OPTO ELEKTRONİK", "BİLGİSAYAR DESTEKLİ DEVRE TASARIMI","FOTONİK UYGULAMALARI", "DEVRE SENTEZİ","TASARIM ALGORİTMALARI","ELEKTROMAGNETİK ALANLARIN BİYOLOJİK ETKİLERİ","YAPAY ZEKA VE MÜHENDİSLİK UYGULAMALARI","BİLGİSAYARLI GÖRÜ","GÖMÜLÜ SİSTEMLERİN UYGULAMALARI","BİYOMEDİKAL ENSTRUMANTASYON" ],
          2: ["YÜKSEK GERİLİM TEKNİĞİ","ANTENLER", "HİBRİD VE ELEKTRİKLİ ARAÇ TEKNOLOJİSİ","TIP ELEKTRONİĞİ", "KONTROL LABORATUARI","NANOTEKNOLOJİNİN TEMELLERİ", "OPTİK HABERLEŞME","OPTO ELEKTRONİK", "BİLGİSAYAR DESTEKLİ DEVRE TASARIMI","FOTONİK UYGULAMALARI", "DEVRE SENTEZİ","TASARIM ALGORİTMALARI","ELEKTROMAGNETİK ALANLARIN BİYOLOJİK ETKİLERİ","YAPAY ZEKA VE MÜHENDİSLİK UYGULAMALARI","BİLGİSAYARLI GÖRÜ","GÖMÜLÜ SİSTEMLERİN UYGULAMALARI","BİYOMEDİKAL ENSTRUMANTASYON"] }
 };
 const driveLinks = {
     "DEVRE ANALİZİ I": "https://drive.google.com/drive/folders/15jGk2-AKdMuNyA4e2apVSLN2WNkTXb4V?usp=sharing",
     "MÜHENDİSLİK İÇİN DİFERANSİYEL DENKLEMLER": "https://drive.google.com/drive/folders/1HoOrgrbw04uoMmzUbuaoRI3F9afOciw1?usp=sharing",
     "ELEKTRONİK ELEMANLAR": "https://drive.google.com/drive/folders/126fmp3pBkMZLD03TduYEtC15isZrQz8G?usp=sharing",
     "TEKNİK YABANCI DİL I": "https://drive.google.com/drive/folders/1JAwRgXQ1UoQoFAWB_6_pHyGKUkYvOzHP?usp=sharing",
     "LOJİK DEVRELERE GİRİŞ": "https://drive.google.com/drive/folders/1WNyeYM48hosoAImTWq25a5MxzHcGBPaA?usp=sharing",
     "MÜHENDİSLER İÇİN OLASILIK TEORİSİ VE İSTATİSTİK": "https://drive.google.com/drive/folders/12rH0SqwdDgrItmcLbWxDxRakovav5DGp?usp=sharing",
     "ELEKTRONİK DEVRELER I": "https://drive.google.com/drive/folders/16_-M6bRmuDiCEn097bwlmha7ko1Vok5G?usp=sharing",
     "SAYISAL ÇÖZÜMLEME": "https://drive.google.com/drive/folders/11Yn_DCzJGM408D44rhXN6svx28C1EQiK?usp=sharing",
     "LOJİK DEVRE TASARIMI": "https://drive.google.com/drive/folders/19cSvgjKLnkGjuRDcfnaQhgjCwLsugScX?usp=sharing",
     "MÜHENDİSLİK MATEMATİĞİ II": "https://drive.google.com/drive/folders/1--uGxAi9C-FfaTK0Q4QBOunUK0YKQTmj?usp=sharing",
     "OTOMATİK KONTROL": "https://drive.google.com/drive/folders/1K8dP5qSO3T6o4ilVqkv-DtUN6m1FJyR9?usp=sharing",
     "ELEKTRİK TESİSLERİ": "https://drive.google.com/drive/folders/17gMPjabaaDd-B_FJ2HmZQ6cnEEvOauL9?usp=sharing",
     "HABERLEŞME MÜHENDİSLİĞİNİN TEMELLERİ": "https://drive.google.com/drive/folders/1cWzyRFfwbEszYf8E0gp2-Rm5uhSeFHOt?usp=sharing",
     "DEVRE ANALİZİ II": "https://drive.google.com/drive/folders/1E23LitUOAvpKyxPaL_ETWkDb-HBcK-W_?usp=sharing",
