from playwright.sync_api import sync_playwright

def verify_portfolio_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Navigate to the portfolio page
        page.goto("http://localhost:3000/portfolio")

        # Wait for the intro section content to load
        page.wait_for_selector("text=사용자 경험을 최우선으로 생각하는", timeout=10000)

        # Take a screenshot of the entire page to verify all sections
        page.screenshot(path="portfolio_verification.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_portfolio_changes()