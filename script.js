document.addEventListener('DOMContentLoaded', function(){
	const navToggle = document.getElementById('navToggle');
	const nav = document.getElementById('nav');
	const themeToggle = document.getElementById('themeToggle');
	const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

	// Initialize theme from localStorage or system preference
	(function initTheme(){
		const stored = localStorage.getItem('theme');
		if(stored === 'dark' || (!stored && prefersDark)) document.documentElement.classList.add('dark');
		updateThemeIcon();
	})();
	navToggle.addEventListener('click', ()=>{
		if(nav.style.display === 'block') nav.style.display = '';
		else nav.style.display = 'block';
	});

	// Smooth scroll for internal links
	document.querySelectorAll('a[href^="#"]').forEach(a=>{
		a.addEventListener('click', function(e){
			const href = this.getAttribute('href');
			if(href.length>1){
				e.preventDefault();
				const el = document.querySelector(href);
				if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
				if(window.innerWidth<=640) nav.style.display='';
			}
		})
	});

	// Contact form basic handler (no backend)
	const form = document.getElementById('contactForm');
	form.addEventListener('submit', function(e){
		e.preventDefault();
		const name = form.elements['name'].value || 'there';
		alert(`Thanks ${name}! Your message has been recorded (demo).`);
		form.reset();
	});

	// Theme toggle handler
	function updateThemeIcon(){
		if(!themeToggle) return;
		if(document.documentElement.classList.contains('dark')) themeToggle.textContent = '☀️';
		else themeToggle.textContent = '🌙';
	}

	if(themeToggle){
		themeToggle.addEventListener('click', ()=>{
			document.documentElement.classList.toggle('dark');
			const isDark = document.documentElement.classList.contains('dark');
			localStorage.setItem('theme', isDark? 'dark' : 'light');
			updateThemeIcon();
		});
	}
});

