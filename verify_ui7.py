from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3001/AERO/Aerodynamics/Incompressible-Flow/Thin-Airfoil-Theory", wait_until="networkidle")

        # Wait a bit for components to render
        page.wait_for_timeout(2000)

        page.screenshot(path="ui_nav_improvements.png")
        print("Screenshot saved to ui_nav_improvements.png")
        browser.close()

if __name__ == "__main__":
    verify()
