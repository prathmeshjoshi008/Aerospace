from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 1800}) # make it tall to see the bottom
        page.goto("http://localhost:3001/AERO/Aerodynamics/Incompressible-Flow/Thin-Airfoil-Theory", wait_until="networkidle")

        # Scroll to bottom
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(2000)

        page.screenshot(path="ui_nav_bottom.png")
        print("Screenshot saved to ui_nav_bottom.png")
        browser.close()

if __name__ == "__main__":
    verify()
