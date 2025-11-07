using System;
using TMPro; // opcional, com TextMeshPro
using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// Componente simples para exibir um diálogo de confirmação.
/// Use Show(message, callback) para exibir e receber a resposta via callback.
/// </summary>
public class ConfirmationDialog : MonoBehaviour
{
    [Header("UI References")]
    public GameObject panel; // painel que contém o diálogo (set inactive por padrão)
    public TextMeshProUGUI messageTextTMP; // opcional: se estiver usando TextMeshPro
    public Text messageText;                 // opcional: se estiver usando UI.Text
    public Button yesButton;
    public Button noButton;

    // Evento que outros scripts podem assinar
    public event Action<bool> OnAnswered;

    private void Awake()
    {
        // garante que o painel esteja fechado no início
        if (panel != null) panel.SetActive(false);

        // configurações de botão
        if (yesButton != null) yesButton.onClick.AddListener(() => Answer(true));
        if (noButton != null) noButton.onClick.AddListener(() => Answer(false));
    }

    /// <summary>
    /// Mostra o diálogo com a mensagem e registra um callback (assinamento).
    /// </summary>
    /// <param name="message">Mensagem a ser mostrada</param>
    /// <param name="callback">Callback que recebe true (sim) ou false (não)</param>
    public void Show(string message, Action<bool> callback)
    {
        // atualiza texto
        if (messageTextTMP != null) messageTextTMP.text = message;
        if (messageText != null) messageText.text = message;

        // assina temporariamente o callback
        if (callback != null) OnAnswered += callback;

        // abrir painel
        if (panel != null) panel.SetActive(true);
    }

    /// <summary>
    /// Responde a ação: invoca o evento e limpa assinantes temporários.
    /// </summary>
    /// <param name="answer">true = sim, false = não</param>
    private void Answer(bool answer)
    {
        // invoca
        OnAnswered?.Invoke(answer);

        // limpar assinantes para evitar chamadas duplicadas
        OnAnswered = null;

        // fechar painel
        if (panel != null) panel.SetActive(false);
    }
}
