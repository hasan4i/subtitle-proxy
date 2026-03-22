<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>AniStream - Anime İzleme Platformu</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;900&display=swap" rel="stylesheet">
<style>
  :root{--bg:#07090f;--bg2:#0e1220;--bg3:#151c2e;--border:#1e2a42;--accent:#5b7cfd;--accent2:#a78bfa;--text:#e8eaf6;--muted:#6b7a99;--green:#22c55e;--red:#ef4444;--gold:#f59e0b;}
  *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
  html,body{height:100%;background:var(--bg);color:var(--text);font-family:'Nunito',sans-serif;overflow:hidden;}
  svg{display:inline-block;vertical-align:middle;flex-shrink:0;}
  #app{display:flex;flex-direction:column;height:100vh;max-width:480px;margin:0 auto;position:relative;}
  #pages{flex:1;overflow-y:auto;overflow-x:hidden;}
  #pages::-webkit-scrollbar{display:none;}
  #bottom-nav{display:flex;background:rgba(7,9,15,.97);backdrop-filter:blur(20px);border-top:1px solid var(--border);padding:8px 0 14px;flex-shrink:0;z-index:50;}
  .nav-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:var(--muted);cursor:pointer;padding:4px 0;font-family:'Nunito',sans-serif;font-size:10px;font-weight:700;transition:color .2s;}
  .nav-btn.active{color:var(--accent2);}
  .page{display:none;min-height:calc(100vh - 70px);}
  .page.active{display:block;}
  .hero{background:linear-gradient(135deg,#0a0d1a,#0e1630 50%,#131b3a);padding:52px 20px 20px;position:relative;overflow:hidden;}
  .hero::before{content:'';position:absolute;top:-80px;right:-80px;width:260px;height:260px;background:radial-gradient(circle,rgba(91,124,253,.18),transparent 70%);border-radius:50%;}
  .hero-label{font-size:11px;color:var(--accent2);font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;}
  .hero-title{font-size:27px;font-weight:900;line-height:1.2;margin-bottom:6px;}
  .hero-title span{background:linear-gradient(90deg,#5b7cfd,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  .hero-sub{color:var(--muted);font-size:13px;}
  .search-wrap{padding:14px 20px 0;}
  .search-box{position:relative;}
  .search-box .si{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--muted);}
  .search-box input{width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:14px;color:var(--text);padding:12px 16px 12px 42px;font-size:14px;font-family:'Nunito',sans-serif;outline:none;}
  .search-box input:focus{border-color:var(--accent);}
  .search-box input::placeholder{color:var(--muted);}
  .genres{display:flex;gap:8px;padding:12px 20px;overflow-x:auto;}
  .genres::-webkit-scrollbar{display:none;}
  .genre-pill{flex-shrink:0;background:var(--bg3);border:1px solid var(--border);border-radius:20px;padding:6px 14px;font-size:12px;color:var(--muted);cursor:pointer;font-family:'Nunito',sans-serif;font-weight:700;}
  .genre-pill.active{background:linear-gradient(135deg,#5b7cfd,#a78bfa);border-color:transparent;color:#fff;}
  .sec-title{padding:0 20px 10px;font-size:11px;color:var(--muted);font-weight:700;letter-spacing:2px;text-transform:uppercase;display:flex;align-items:center;gap:6px;}
  .featured-wrap{padding:0 20px 16px;}
  .featured-card{border-radius:18px;overflow:hidden;position:relative;cursor:pointer;min-height:190px;background:var(--bg3);}
  .featured-card img{width:100%;height:190px;object-fit:cover;display:block;}
  .featured-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(7,9,15,.95),rgba(7,9,15,.4) 60%,transparent);padding:14px;display:flex;flex-direction:column;justify-content:flex-end;}
  .featured-tags{display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap;}
  .tag{background:rgba(91,124,253,.25);color:var(--accent2);font-size:10px;padding:3px 9px;border-radius:20px;font-weight:700;border:1px solid rgba(91,124,253,.3);}
  .tag.green{background:rgba(34,197,94,.2);color:#4ade80;border-color:rgba(34,197,94,.3);}
  .featured-name{font-size:22px;font-weight:900;}
  .featured-meta{font-size:12px;color:#94a3b8;margin-top:3px;display:flex;gap:8px;align-items:center;}
  .anime-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 20px 20px;}
  .anime-card{background:var(--bg2);border-radius:14px;overflow:hidden;border:1px solid var(--border);cursor:pointer;}
  .anime-card:active{opacity:.85;}
  .anime-card-img{position:relative;}
  .anime-card-img img{width:100%;aspect-ratio:2/3;object-fit:cover;display:block;background:var(--bg3);}
  .anime-card-badge{position:absolute;top:8px;left:8px;background:rgba(34,197,94,.9);color:#fff;font-size:9px;padding:2px 7px;border-radius:10px;font-weight:700;}
  .anime-card-add{position:absolute;top:8px;right:8px;width:30px;height:30px;border-radius:50%;background:rgba(7,9,15,.7);border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;}
  .anime-card-add.in-list{background:var(--accent);}
  .anime-card-info{padding:10px 10px 12px;}
  .anime-card-title{font-size:13px;font-weight:700;line-height:1.3;margin-bottom:5px;}
  .anime-card-meta{display:flex;justify-content:space-between;align-items:center;}
  .rating{color:var(--gold);font-size:12px;font-weight:700;display:flex;align-items:center;gap:3px;}
  .ep-count{color:var(--muted);font-size:11px;}
  .detail-banner{position:relative;height:220px;}
  .detail-banner img{width:100%;height:100%;object-fit:cover;display:block;background:var(--bg3);}
  .detail-banner-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(7,9,15,.3),var(--bg));}
  .detail-back{position:absolute;top:16px;left:16px;width:38px;height:38px;border-radius:50%;background:rgba(7,9,15,.6);border:none;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;}
  .detail-info{display:flex;gap:16px;margin-top:-50px;padding:0 20px;position:relative;}
  .detail-cover{width:95px;height:135px;border-radius:12px;object-fit:cover;border:3px solid var(--bg3);flex-shrink:0;background:var(--bg3);}
  .detail-meta{padding-top:52px;}
  .detail-title{font-size:19px;font-weight:900;line-height:1.2;}
  .detail-jp{color:var(--accent);font-size:13px;margin-top:2px;}
  .detail-tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;}
  .stats-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin:18px 20px;}
  .stat-box{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:12px 8px;text-align:center;}
  .stat-icon{display:flex;justify-content:center;margin-bottom:4px;color:var(--accent2);}
  .stat-val{font-size:15px;font-weight:900;}
  .stat-label{font-size:10px;color:var(--muted);margin-top:2px;font-weight:600;}
  .detail-desc{padding:0 20px;color:#94a3b8;font-size:14px;line-height:1.65;}
  .action-row{display:flex;gap:10px;padding:16px 20px;}
  .btn-primary{flex:1;background:linear-gradient(135deg,#5b7cfd,#a78bfa);border:none;color:#fff;border-radius:14px;padding:14px;font-weight:700;font-size:15px;cursor:pointer;font-family:'Nunito',sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;}
  .btn-secondary{background:var(--bg3);border:1.5px solid var(--border);color:var(--accent2);border-radius:14px;padding:14px 16px;font-weight:700;font-size:14px;cursor:pointer;font-family:'Nunito',sans-serif;display:flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;}
  .btn-secondary.active{background:rgba(91,124,253,.15);border-color:var(--accent);}
  .episodes-section{padding:0 20px 20px;}
  .ep-source-label{font-size:12px;color:var(--muted);margin-bottom:8px;font-weight:600;}
  .ep-source-input{width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:12px;color:var(--text);padding:10px 14px;font-size:13px;font-family:'Nunito',sans-serif;outline:none;margin-bottom:12px;}
  .ep-source-input:focus{border-color:var(--accent);}
  .ep-source-input::placeholder{color:var(--muted);}
  .ep-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;}
  .ep-btn{aspect-ratio:1;border-radius:10px;border:1px solid var(--border);background:var(--bg3);color:var(--text);font-size:13px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;display:flex;align-items:center;justify-content:center;}
  .ep-btn:active{opacity:.7;}
  .ep-btn.active{background:linear-gradient(135deg,#5b7cfd,#a78bfa);border-color:transparent;color:#fff;}
  .ep-btn.watched{background:rgba(34,197,94,.15);border-color:rgba(34,197,94,.4);color:#4ade80;}
  #video-modal{display:none;position:fixed;inset:0;background:#000;z-index:200;flex-direction:column;}
  #video-modal.open{display:flex;}
  #video-frame-wrap{flex:1;position:relative;background:#000;overflow:hidden;}
  #video-iframe{width:100%;height:100%;border:none;display:none;}
  #video-placeholder{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:var(--muted);padding:30px;text-align:center;}
  #video-placeholder h3{font-size:16px;color:var(--text);opacity:.6;}
  #video-placeholder p{font-size:13px;line-height:1.7;}
  .video-top-bar{position:absolute;top:0;left:0;right:0;background:linear-gradient(to bottom,rgba(0,0,0,.85),transparent);padding:14px 16px;display:flex;align-items:center;gap:12px;z-index:10;}
  .video-close{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.15);border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .video-title{font-size:14px;font-weight:700;}
  .video-ep{font-size:12px;color:#94a3b8;margin-top:2px;}
  #video-controls{background:var(--bg2);border-top:1px solid var(--border);padding:12px 16px;}
  .video-ep-scroll{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;}
  .video-ep-scroll::-webkit-scrollbar{display:none;}
  .vepisode-btn{flex-shrink:0;width:38px;height:38px;border-radius:10px;border:1px solid var(--border);background:var(--bg3);color:var(--text);font-size:13px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;}
  .vepisode-btn.active{background:linear-gradient(135deg,#5b7cfd,#a78bfa);border-color:transparent;color:#fff;}
  .comments-section{padding:0 20px 24px;}
  .comment-form{background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:14px;margin-bottom:14px;}
  .comment-form-top{display:flex;gap:10px;align-items:center;margin-bottom:10px;}
  .comment-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#5b7cfd,#a78bfa);display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;flex-shrink:0;}
  .star-input{display:flex;gap:4px;margin-bottom:8px;}
  .star-input span{font-size:24px;cursor:pointer;color:var(--border);line-height:1;}
  .star-input span.lit{color:var(--gold);}
  .comment-textarea{width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:12px;color:var(--text);padding:10px 14px;font-size:13px;font-family:'Nunito',sans-serif;outline:none;resize:none;height:72px;}
  .comment-submit{width:100%;margin-top:8px;background:linear-gradient(135deg,#5b7cfd,#a78bfa);border:none;color:#fff;border-radius:12px;padding:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;display:flex;align-items:center;justify-content:center;gap:6px;}
  .comment-item{background:var(--bg2);border:1px solid var(--border);border-radius:14px;padding:14px;margin-bottom:10px;display:flex;gap:10px;}
  .comment-avt{width:36px;height:36px;border-radius:50%;background:var(--bg3);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:var(--accent2);flex-shrink:0;border:1px solid var(--border);}
  .comment-body{flex:1;}
  .comment-header{display:flex;justify-content:space-between;margin-bottom:4px;}
  .comment-user{font-size:13px;font-weight:700;}
  .comment-time{font-size:11px;color:var(--muted);}
  .comment-stars{color:var(--gold);font-size:12px;margin-bottom:4px;}
  .comment-text{font-size:13px;color:#94a3b8;line-height:1.5;}
  .list-item{background:var(--bg2);border:1px solid var(--border);border-radius:14px;display:flex;gap:12px;padding:12px;margin-bottom:12px;cursor:pointer;}
  .list-item img{width:58px;height:82px;border-radius:10px;object-fit:cover;flex-shrink:0;background:var(--bg3);}
  .list-item-info{flex:1;}
  .list-item-title{font-size:14px;font-weight:700;margin-bottom:4px;}
  .list-item-jp{font-size:12px;color:var(--accent);margin-bottom:6px;}
  .list-remove{background:none;border:none;color:var(--muted);cursor:pointer;padding:4px;display:flex;align-items:center;}
  .profile-header{background:linear-gradient(135deg,#0e1630,#0a0d1a);padding:36px 20px 20px;}
  .profile-avatar{width:78px;height:78px;border-radius:50%;background:linear-gradient(135deg,#5b7cfd,#a78bfa);display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 12px;border:3px solid var(--bg3);}
  .profile-name{text-align:center;font-size:20px;font-weight:900;}
  .profile-since{text-align:center;color:var(--muted);font-size:12px;margin-top:4px;}
  .profile-stats{display:flex;justify-content:center;gap:28px;margin-top:16px;}
  .profile-stat{text-align:center;}
  .profile-stat-val{font-size:20px;font-weight:900;}
  .profile-stat-label{font-size:11px;color:var(--muted);margin-top:2px;}
  .profile-menu-item{background:var(--bg2);border:1px solid var(--border);border-radius:14px;padding:14px 16px;margin-bottom:8px;display:flex;align-items:center;gap:12px;cursor:pointer;}
  .profile-menu-icon{width:36px;height:36px;border-radius:10px;background:var(--bg3);display:flex;align-items:center;justify-content:center;color:var(--accent2);flex-shrink:0;}
  .profile-menu-text{flex:1;font-size:14px;font-weight:600;}
  .profile-menu-arrow{color:var(--muted);display:flex;align-items:center;}
  .page-header{display:flex;align-items:center;gap:12px;padding:52px 20px 18px;}
  .page-header h2{font-size:22px;font-weight:900;}
  .page-header-icon{width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#5b7cfd,#a78bfa);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;}
  .empty-state{text-align:center;padding:60px 20px;color:var(--muted);}
  .empty-state h3{font-size:16px;font-weight:700;margin-bottom:6px;color:var(--text);opacity:.6;}
  .empty-state p{font-size:13px;line-height:1.6;}
  #toast{position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--bg3);border:1px solid var(--border);border-radius:12px;padding:10px 18px;font-size:13px;font-weight:600;z-index:300;opacity:0;transition:all .25s;pointer-events:none;white-space:nowrap;box-shadow:0 8px 24px rgba(0,0,0,.5);}
  #toast.show{opacity:1;transform:translateX(-50%) translateY(0);}
</style>
</head>
<body>

<!-- INLINE SVG ICONS - internet bağlantısı gerekmez -->
<svg style="display:none">
  <symbol id="I-home" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></symbol>
  <symbol id="I-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></symbol>
  <symbol id="I-bookmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></symbol>
  <symbol id="I-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></symbol>
  <symbol id="I-play" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></symbol>
  <symbol id="I-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></symbol>
  <symbol id="I-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></symbol>
  <symbol id="I-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></symbol>
  <symbol id="I-back" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></symbol>
  <symbol id="I-star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></symbol>
  <symbol id="I-tv" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></symbol>
  <symbol id="I-cal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></symbol>
  <symbol id="I-film" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></symbol>
  <symbol id="I-msg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></symbol>
  <symbol id="I-send" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></symbol>
  <symbol id="I-trash" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></symbol>
  <symbol id="I-chevr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></symbol>
  <symbol id="I-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></symbol>
  <symbol id="I-cog" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></symbol>
 
