# halfbuilt

## Dev Setup
1. Install uv: https://docs.astral.sh/uv/getting-started/installation/
2. `uv sync`
3. `uv run pre-commit install` to enable git hooks (formatting, linting)
4. `uv run pytest` to verify

Adding a dependency: `uv add <package>` (or `uv add --dev <package>` for dev-only tools), then commit the updated `pyproject.toml` and `uv.lock`.
