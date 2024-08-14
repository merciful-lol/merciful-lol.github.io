document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    const blockedKeys = [
        { key: 'F12' },
        { ctrlKey: true, shiftKey: true, key: 'I' },
        { ctrlKey: true, key: 'U' },
        { ctrlKey: true, shiftKey: true, key: 'C' },
        { ctrlKey: true, shiftKey: true, key: 'J' }
    ];

    for (let key of blockedKeys) {
        if (e.key === key.key && e.ctrlKey === key.ctrlKey && e.shiftKey === key.shiftKey) {
            e.preventDefault();
        }
    }
});

window.onload = function() {
    setTimeout(function() {
        document.addEventListener('copy', function(e) {
            e.clipboardData.setData('text/plain', 'MeowKittyRawrxD!');
            e.preventDefault();
        });
    }, 1000);
};